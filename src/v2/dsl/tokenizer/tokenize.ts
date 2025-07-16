import { splitArgs } from "../../utils/splitArgs";

export type Token =
  | { type: "command_group"; value: string }
  | { type: "command"; value: string }
  | { type: "command_type"; value: "call" | "normal" | "scope_use" }
  | { type: "reference"; value: string }
  | { type: "operator"; value: string }
  | { type: "arrow" }
  | { type: "cast"; value: string }
  | { type: "literal"; value: string }
  | { type: "pipe" }
  | { type: "positional_arg"; value: string }
  | {
      type: "named_arg";
      key: string;
      value: string;
      escaped: boolean;
      otherValues: string[];
    }
  | { type: "paren_open" }
  | { type: "paren_close" }
  | { type: "comma" }
  | { type: "semicolon" }
  | { type: "eof" };

export function tokenize(input: string, log: boolean = false): Token[] {
  const tokens: Token[] = [];
  const segments = input.split(/(?<=\))\s*;|;\s*/).filter(Boolean);

  if (log) console.log("Segments: ", segments);

  let i = 0;
  for (const segment of segments) {
    const type = getCommandType(segment);
    tokens.push({ type: "command_type", value: type });

    const regex =
      /@use\.[a-zA-Z_][a-zA-Z0-9_]*|\s+|(['"])(.*?)\1(?:\([a-zA-Z_][a-zA-Z0-9_]*\))?|"(.*?)"|\d+\([a-zA-Z_][a-zA-Z0-9_]*\)|[\$a-zA-Z_][\$a-zA-Z0-9_\.]*\([a-zA-Z_][a-zA-Z0-9_]*\)|[\$a-zA-Z_][\$a-zA-Z0-9_]*(?:\.[\$a-zA-Z_][\$a-zA-Z0-9_]*)?:[\$a-zA-Z_][\$a-zA-Z0-9_\.]*|->|\d+|true|false|\([a-zA-Z_][a-zA-Z0-9_]*\)|[+\-*/%]?=|\(|\)|,|;|\||[\$a-zA-Z_][\$a-zA-Z0-9_\.]*/g;

    let seg = segment + ";";
    let match;
    while ((match = regex.exec(seg))) {
      const text = match[0].trim();
      if (!text) continue;
      // support for @use.command
      else if (/^@use\.[a-zA-Z_][a-zA-Z0-9_]*$/.test(text)) {
        const commandName = text.slice("@use.".length);
        tokens.push({ type: "command", value: commandName });
      }

      if (
        /^([a-zA-Z_]+\.)?[a-zA-Z_]+:[\$a-zA-Z_][\$a-zA-Z0-9_\.]*$/.test(text)
      ) {
        const [left, ref] = text.split(":");
        const parts = left.split(".");

        if (parts.length === 2) {
          tokens.push({ type: "command_group", value: parts[0] });
          tokens.push({ type: "command", value: parts[1] });
        } else {
          tokens.push({ type: "command", value: parts[0] });
        }

        tokens.push({ type: "reference", value: ref });
      }

      // Casted number literal: 45(number)
      else if (/^\d+\([a-zA-Z_][a-zA-Z0-9_]*\)$/.test(text)) {
        const val = text.substring(0, text.indexOf("("));
        const cast = text.slice(text.indexOf("(") + 1, -1);
        tokens.push({ type: "literal", value: val });
        tokens.push({ type: "cast", value: cast });
      }

      // Quoted strings with optional cast: 'hello'(string) or "hello"(string)
      else if (/^(['"])(.*?)\1(?:\(([a-zA-Z_][a-zA-Z0-9_]*)\))?$/.test(text)) {
        const match = /^(['"])(.*?)\1(?:\(([a-zA-Z_][a-zA-Z0-9_]*)\))?$/.exec(
          text
        );
        if (match) {
          const value = match[2]; // inner quoted string
          const cast = match[3]; // optional cast
          tokens.push({ type: "literal", value });
          if (cast) tokens.push({ type: "cast", value: cast });
        }
      }

      // Plain quoted string literal: 'hello' or "hello"
      else if (/^(['"])(.*?)\1$/.test(text)) {
        const match = /^(['"])(.*?)\1$/.exec(text);
        if (match) {
          const [, , strVal] = match;
          tokens.push({ type: "literal", value: strVal });
        }
      }

      // Casted reference: user.id(number)
      else if (
        /^[\$a-zA-Z_][\$a-zA-Z0-9_\.]*\([\$a-zA-Z_][\$a-zA-Z0-9_]*\)$/.test(
          text
        )
      ) {
        const val = text.substring(0, text.indexOf("("));
        const cast = text.slice(text.indexOf("(") + 1, -1);

        const normalized = val.toLowerCase();

        if (normalized === "true" || normalized === "false") {
          tokens.push({ type: "literal", value: val });
          tokens.push({ type: "cast", value: cast });
        } else {
          tokens.push({ type: "reference", value: val });
          tokens.push({ type: "cast", value: cast });
        }
      }

      // Standalone cast
      else if (/^\([a-zA-Z_][a-zA-Z0-9_]*\)$/.test(text)) {
        tokens.push({ type: "cast", value: text.slice(1, -1) });
      }

      // Quoted strings
      else if (/^(['"])(.*?)\1$/.test(text)) {
        const quoteMatch = /^(['"])(.*?)\1$/.exec(text);
        if (quoteMatch) {
          const value = quoteMatch[2]; // inner content
          tokens.push({ type: "literal", value });
        }
      }
      // Arrow
      else if (text === "->") {
        tokens.push({ type: "arrow" });
      }

      // Pipe
      else if (text === "|") {
        tokens.push({ type: "pipe" });

        const argText = seg.slice(regex.lastIndex).trimStart();
        const endOfArgs = argText.search(/[;]/);
        const argsBlock =
          endOfArgs === -1 ? argText : argText.slice(0, endOfArgs);

        const args = splitArgs(argsBlock);

        for (const arg of args) {
          if (!arg) continue;

          const namedArgMatch = /^\\?([a-zA-Z0-9_]+)=(['"]?)(.*?)\2$/.exec(
            arg.trim()
          );

          if (namedArgMatch) {
            const [fullArg, rawKey, , rawValue] = namedArgMatch;

            const escaped = fullArg.startsWith("\\");
            const key = rawKey.startsWith("\\") ? rawKey.slice(1) : rawKey;
            const [value, ...otherValues] = rawValue.trim().split(",");
            tokens.push({
              type: "named_arg",
              key,
              value,
              otherValues,
              escaped,
            });
          } else {
            const value = arg.trim().replace(/^['"]|['"]$/g, "");
            tokens.push({ type: "positional_arg", value });
          }
        }

        regex.lastIndex += argsBlock.length;
      }

      // Punctuation
      else if (text === ",") {
        tokens.push({ type: "comma" });
      } else if (text === ";") {
        tokens.push({ type: "semicolon" });
      } else if (text === "(") {
        tokens.push({ type: "paren_open" });
      } else if (text === ")") {
        tokens.push({ type: "paren_close" });
      }

      // Operator
      else if (/^[+\-*/%]?=$/.test(text)) {
        tokens.push({ type: "operator", value: text });
      }

      // true and false as literals
      else if (text === "true" || text === "false") {
        tokens.push({ type: "literal", value: text });
      }

      // other literals (numbers)
      else if (/^\d+$/.test(text)) {
        tokens.push({ type: "literal", value: text });
      }

      // Fallback: references
      else if (
        /^[\$a-zA-Z_][\$a-zA-Z0-9_]*(\.[\$a-zA-Z_][\$a-zA-Z0-9_]*)*$/.test(text)
      ) {
        tokens.push({ type: "reference", value: text });
      }
    }

    i++;
  }

  tokens.push({ type: "eof" });
  return tokens;
}

function getCommandType(segment: string): "call" | "scope_use" | "normal" {
  const trimmed = segment.trim();
  const head = trimmed.split(/[|;]/)[0].trim(); // get part before args

  if (
    /^[\$a-zA-Z_][\$a-zA-Z0-9_]*(\.[\$a-zA-Z_][\$a-zA-Z0-9_]*)*\s*\(/.test(head)
  )
    return "call";

  if (/^@use\.[a-zA-Z_][a-zA-Z0-9_]*$/.test(head)) return "scope_use";

  return "normal";
}
