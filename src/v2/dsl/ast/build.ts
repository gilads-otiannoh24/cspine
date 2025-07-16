import { chunkTokens } from "@/v2/utils/chunkTokens";
import { ASTNode } from "../types";
import { buildCallAST } from "./call";
import { buildNormalAST } from "./normal";
import { Token } from "@/v2/dsl/tokenizer/tokenize";
import { buildScopeUseAST } from "./scopeUse";

export function buildAST(inputTokens: Token[], log: boolean = false) {
  const commands = chunkTokens(inputTokens);

  if (log) console.log(commands);

  const asts: ASTNode[] = [];

  commands.forEach((command) => {
    let parsed = false;

    for (let i = 0; i < command.length; i++) {
      const token = command[i];

      if (parsed) break;

      if (token.type === "command_type" && token.value === "call") {
        asts.push(...buildCallAST(command, log));
        parsed = true;
      }

      if (token.type === "command_type" && token.value === "normal") {
        asts.push(...buildNormalAST(command, log));
        parsed = true;
      }

      if (token.type === "command_type" && token.value === "scope_use") {
        asts.push(...buildScopeUseAST(command, log));
        parsed = true;
      }
    }

    if (parsed) return;
  });

  return asts;
}
