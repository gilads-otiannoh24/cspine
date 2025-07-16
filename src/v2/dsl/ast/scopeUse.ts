// src/ast/buildScopeUseAST.ts

import { Token } from "../tokenizer/tokenize";
import { getCommadArgs } from "@/v2/utils/getCommandArgs";
import { CommandArgs, ScopeUseNode } from "../types";

export function buildScopeUseAST(
  tokens: Token[],
  log: boolean = false
): ScopeUseNode[] {
  const result: ScopeUseNode[] = [];

  let i = 0;

  while (i < tokens.length) {
    let command = "";
    let commandArgs: CommandArgs = { positional: [], named: {} };

    const start = i;
    let token = tokens[i];

    if (token?.type === "command_type" && token.value === "scope_use") {
      i++;

      token = tokens[i];
      if (token?.type === "command") {
        command = token.value;
        i++;
      } else {
        if (log) console.log("Invalid scope_use: missing command token", token);
        continue;
      }

      if (tokens[i]?.type === "pipe") {
        i++;
        const g = getCommadArgs(tokens, i);
        commandArgs = g.commandArgs;
        i = g.i;
      }

      result.push({
        command,
        commandArgs,
        type: "scope_use",
      });
    } else {
      i++;
    }

    // Prevent infinite loop
    if (i === start) i++;
  }

  return result;
}
