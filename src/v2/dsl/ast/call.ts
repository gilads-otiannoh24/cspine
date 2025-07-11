import { attachCast } from "@/v2/utils/attachCast";
import { Token } from "../tokenizer";
import { getCommadArgs } from "@/v2/utils/getCommandArgs";
import { CallNode, CommandArgs, ValueNode } from "../types";

export function buildCallAST(
  tokens: Token[],
  log: boolean = false
): CallNode[] {
  const calls: CallNode[] = [];
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];
    const args: CallNode["args"] = [];
    let commandArgs: CommandArgs = { positional: [], named: {} };

    if (token.type === "reference") {
      const name = token.value;
      i++;

      // Check for opening paren
      if (tokens[i]?.type === "paren_open") {
        i++; // skip '('

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
      }

      if (tokens[i].type === "pipe") {
        i++;

        const g = getCommadArgs(tokens, i);

        commandArgs = g.commandArgs;
        i = g.i;
      }

      calls.push({
        type: "call",
        name,
        args,
        commandArgs,
      });
    }

    if (tokens[i]?.type === "semicolon") i++;
    else i++;
  }

  return calls;
}
