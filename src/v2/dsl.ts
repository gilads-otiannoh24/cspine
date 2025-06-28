export type Token =
  | { type: "command"; value: string }
  | { type: "reference"; value: string }
  | { type: "operator"; value: string }
  | { type: "arrow" }
  | { type: "cast"; value: string }
  | { type: "literal"; value: string }
  | { type: "paren_open" }
  | { type: "paren_close" }
  | { type: "comma" }
  | { type: "semicolon" }
  | { type: "eof" };

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const regex =
    /\s+|"(.*?)"|\d+\([a-zA-Z_][a-zA-Z0-9_]*\)|[a-zA-Z_][a-zA-Z0-9_\.]*\([a-zA-Z_][a-zA-Z0-9_]*\)|[a-zA-Z_][a-zA-Z0-9_]*:[a-zA-Z_][a-zA-Z0-9_\.]*|->|\d+|true|false|\([a-zA-Z_][a-zA-Z0-9_]*\)|[+\-*/%]?=|\(|\)|,|;|[a-zA-Z_][a-zA-Z0-9_\.]*/g;

  let match;
  while ((match = regex.exec(input))) {
    const text = match[0].trim();
    if (!text) continue;

    // Combined command and reference
    if (/^[a-zA-Z_]+:[a-zA-Z_][a-zA-Z0-9_\.]*$/.test(text)) {
      const [cmd, ref] = text.split(":");
      tokens.push({ type: "command", value: cmd });
      tokens.push({ type: "reference", value: ref });
    }

    // Casted number literal: 45(number)
    else if (/^\d+\([a-zA-Z_][a-zA-Z0-9_]*\)$/.test(text)) {
      const val = text.substring(0, text.indexOf("("));
      const cast = text.slice(text.indexOf("(") + 1, -1);
      tokens.push({ type: "literal", value: val });
      tokens.push({ type: "cast", value: cast });
    }

    // Casted reference: user.id(number)
    else if (
      /^[a-zA-Z_][a-zA-Z0-9_\.]*\([a-zA-Z_][a-zA-Z0-9_]*\)$/.test(text)
    ) {
      const val = text.substring(0, text.indexOf("("));
      const cast = text.slice(text.indexOf("(") + 1, -1);

      const normalized = val.toLowerCase();
      if (normalized === "true" || normalized === "false") {
        tokens.push({ type: "literal", value: val });
        tokens.push({ type: "cast", value: cast });
        continue;
      }

      tokens.push({ type: "reference", value: val });
      tokens.push({ type: "cast", value: cast });
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
    else if (/^[a-zA-Z_][a-zA-Z0-9_\.]*$/.test(text)) {
      tokens.push({ type: "reference", value: text });
    }
  }

  tokens.push({ type: "eof" });
  return tokens;
}

export interface ValueNode {
  type: "literal" | "reference";
  value: string;
  cast?: string;
}

export interface ASTNode {
  command: string;
  reference: string;
  operator?: string;
  operand?: ValueNode;
  target?: ValueNode;
}

type VarNode = {
  command: string;
  reference: string;
  target: {
    type: "literal" | "reference";
    value: string;
    cast?: string;
  };
};

export function buildAST(tokens: Token[]): VarNode[] {
  const result: VarNode[] = [];
  let i = 0;

  while (i < tokens.length) {
    let command = "";
    let reference = "";
    let target: VarNode["target"] | null = null;
    let token = tokens[i];

    const start = i;

    // 1. Expect: command
    if (token?.type === "command") {
      command = token.value;
      i++;
    } else {
      i++; // Prevent infinite loop
      continue;
    }

    token = tokens[i];

    // 2. Expect: reference
    if (token?.type === "reference") {
      reference = token.value;
      i++;
    } else {
      i++;
      continue;
    }

    // 3. Expect: arrow
    if (tokens[i]?.type === "arrow") {
      i++;
    } else {
      i++;
      continue;
    }

    // 4. Expect: target literal or reference
    const valToken = tokens[i];
    if (valToken?.type === "literal" || valToken?.type === "reference") {
      target = {
        type: valToken.type,
        value: valToken.value,
      };
      i++;

      // 5. Optional: cast
      const c = attachCast(target as ValueNode, tokens, i);
      target = c[0];
      i = c[1];
    } else {
      i++;
      continue;
    }

    // 6. Add to AST
    if (command && reference && target) {
      result.push({ command, reference, target });
    }

    // 7. Skip optional semicolon
    if (tokens[i]?.type === "semicolon") i++;

    // 8. Safety: if we're stuck, move forward
    if (i === start) i++;
  }

  return result;
}

export interface CallArg {
  value: ValueNode;
}

export interface CallNode {
  type: "call";
  name: string;
  args: CallArg[];
}

export function buildCallAST(tokens: Token[]): CallNode[] {
  const calls: CallNode[] = [];
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    if (token.type === "reference") {
      const name = token.value;
      i++;

      // Check for opening paren
      if (tokens[i]?.type === "paren_open") {
        i++; // skip '('
        const args: CallNode["args"] = [];

        while (i < tokens.length && tokens[i].type !== "paren_close") {
          let arg: ValueNode | null = null;

          let t = tokens[i];
          if (t.type === "literal") {
            arg = { type: "literal", value: t.value };
          } else if (t.type === "reference") {
            arg = { type: "reference", value: t.value };
          }

          i++;

          const c = attachCast(arg as ValueNode, tokens, i);
          arg = c[0];
          i = c[1];

          if (arg) args.push({ value: arg });

          if (tokens[i]?.type === "comma") i++; // skip comma if any
        }

        if (tokens[i]?.type === "paren_close") i++; // skip ')'

        calls.push({
          type: "call",
          name,
          args,
        });
      }
    }

    if (tokens[i]?.type === "semicolon") i++;
    else i++;
  }

  return calls;
}

function attachCast(
  node: ValueNode,
  tokens: Token[],
  i: number
): [ValueNode, number] {
  const token = tokens[i];
  if (token?.type === "cast") {
    node.cast = token.value;
    i++;
  }
  return [node, i];
}

type ParseMode = "var" | "call";

export function parse(input: string, mode: ParseMode) {
  const tokens = tokenize(input);

  if (mode === "call") {
    return buildCallAST(tokens);
  }

  const ast = buildAST(tokens);
  return ast;
}
