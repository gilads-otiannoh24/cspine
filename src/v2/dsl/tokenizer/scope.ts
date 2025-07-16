// tokenizer/tokenizeScope.ts

import { Token, tokenize } from "./tokenize";

export type ScopeItem = {
  name: string;
  tokens: Token[];
};

export interface ScopeToken {
  commands: ScopeItem[];
  args: ScopeItem[];
  groups: ScopeItem[];
}

type CommandBlock = "commands" | "args" | "groups";

export function tokenizeScope(input: string, log: boolean = false): ScopeToken {
  const lines = input
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((line) => line.length && !line.startsWith("//"));

  let currentBlock: CommandBlock | null = null;
  const tokens: ScopeToken = {
    commands: [],
    args: [],
    groups: [],
  };

  for (const line of lines) {
    if (/^(commands|args|groups):$/.test(line)) {
      currentBlock = line.replace(":", "") as CommandBlock;
      continue;
    }

    if (!currentBlock) continue;

    const [left, right] = line.split(":=").map((s) => s.trim());
    if (!left || !right) continue;

    let tokenList: Token[] = [];

    if (currentBlock === "commands") {
      tokenList = tokenize(right);
    } else {
      tokenList = tokenizeArgs(right);
    }

    tokens[currentBlock].push({ name: left, tokens: tokenList });
  }

  return tokens;
}

export function tokenizeArgs(input: string): Token[] {
  const result: Token[] = [];
  const argRegex =
    /\\?([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(\".*?\"|\'.*?\'|\d+|true|false)/g;

  let match;
  while ((match = argRegex.exec(input)) !== null) {
    const [fullArg, key, rawValue] = match;
    const unquoted = rawValue.replace(/^['"]|['"]$/g, "");
    const [value, ...otherValues] = rawValue.trim().split(",");

    let val =
      value === "true"
        ? true
        : value === "false"
        ? false
        : /^\d+$/.test(value)
        ? Number(value)
        : unquoted;

    result.push({
      type: "named_arg",
      key,
      value: val as string,
      escaped: fullArg.startsWith("\\"),
      otherValues: otherValues,
    });
  }

  return result;
}
