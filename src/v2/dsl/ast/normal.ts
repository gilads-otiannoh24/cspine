import { attachCast } from "@/v2/utils/attachCast";
import { Token } from "../tokenizer";
import { NormalNode, CommandArgs, ValueNode } from "../types";
import { getCommadArgs } from "@/v2/utils/getCommandArgs";

export function buildNormalAST(
  tokens: Token[],
  log: boolean = false
): NormalNode[] {
  const result: NormalNode[] = [];

  let i = 0;

  while (i < tokens.length) {
    let command = "";
    let reference = "";
    let commandArgs: CommandArgs = { positional: [], named: {} };
    let target: NormalNode["target"] | null = null;
    let token = tokens[i];

    const start = i;

    if (log) console.log(token, "AST build iteration:" + i);

    if (token?.type === "command") {
      // 1. Expect: command
      command = token.value;
      i++;
    } else {
      i++; // Prevent infinite loop
      if (log) console.log("Terminated on command", token);

      continue;
    }

    token = tokens[i];

    // 2. Expect: reference
    if (token?.type === "reference") {
      reference = token.value;
      i++;
    } else {
      i++;
      if (log) console.log("Terminated on reference", tokens);
      continue;
    }

    token = tokens[i];

    // 3. Expect: arrow
    if (token?.type === "arrow") {
      i++;
    } else {
      if (!["pipe", "eof"].includes(token?.type)) {
        if (log) console.log("Terminated on arrow", token);
        i++;
        continue;
      }
    }

    // 5. Expect: target literal or reference
    const valToken = tokens[i];
    if (valToken?.type === "literal" || valToken?.type === "reference") {
      target = {
        type: valToken.type,
        value: valToken.value,
      };
      i++;

      // 6. Optional: cast
      const c = attachCast(target as ValueNode, tokens, i);
      target = c[0];
      i = c[1];
    }

    // 4. Expect: pipe
    if (tokens[i]?.type === "pipe") {
      i++;

      const g = getCommadArgs(tokens, i);

      commandArgs = g.commandArgs;
      i = g.i;
    }

    // 7. Add to AST
    if (command && reference) {
      result.push({ command, reference, target, commandArgs, type: "normal" });
    }

    // 8. Skip optional semicolon
    if (tokens[i]?.type === "semicolon") i++;

    // 9. Safety: if we're stuck, move forward
    if (i === start) i++;
  }

  return result;
}
