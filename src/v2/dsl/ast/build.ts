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

  commands.forEach((c) => {
    let parsed = false;
    const inputToken = c.filter((t) => t.type === "input")[0] ?? {};
    const command = c.filter((t) => t.type !== "input");

    for (let i = 0; i < c.length; i++) {
      const token = command[i];

      if (parsed) break;

      if (token.type === "command_type" && token.value === "call") {
        const node: ASTNode = {
          ...(buildCallAST(command, log)[0] ?? {}),
          input: inputToken.value ?? "",
        };
        asts.push(node);
        parsed = true;
      }

      if (token.type === "command_type" && token.value === "normal") {
        const node: ASTNode = {
          ...(buildNormalAST(command, log)[0] ?? {}),
          input: inputToken.value ?? "",
        };
        asts.push(node);
        parsed = true;
      }

      if (token.type === "command_type" && token.value === "scope_use") {
        const node: ASTNode = {
          ...(buildScopeUseAST(command, log)[0] ?? {}),
          input: inputToken.value ?? "",
        };
        asts.push(node);
        parsed = true;
      }
    }

    if (parsed) return;
  });

  return asts.filter((ast) => {
    if (ast.input && Object.keys(ast).length === 1) return false;

    return true;
  });
}
