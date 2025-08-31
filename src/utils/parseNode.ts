import { Options } from "@/CSPine";
import { castValue } from "./castValue";
import { ASTNode, CallNode, CommandArgs, NormalNode } from "@/v2/dsl/types";
import { resolveContextRefs } from "./resolveContectRefs";
import { buildCommandArgs } from "./buislCommandArgs";
import { validateASTNode } from "./inputValidator";

type CallArg = {
  value: any;
};

export interface ParsedNode {
  group: string | null;
  command: string | null;
  reference: string | null;
  target: {
    value: any;
  } | null;
  name: string | null;
  args: CallArg[] | null;
  commandArgs: CommandArgs;
}

export function parseNode(
  node: ASTNode,
  options: Options,
  log: boolean = false
): ParsedNode | null {
  // validate node structure and throw error on invalidity before parsing
  validateASTNode(node, options);

  let parsedNode: ParsedNode | null = null;
  const commandArgs = buildCommandArgs(node.commandArgs, options);

  if (node.type === "call") {
    const call = node as CallNode;

    const args = call.args.map((a) => {
      let value = a.value.value;
      const cast = a.value.cast;
      const type = a.value.type;

      value = resolveContextRefs(value, options);

      if (
        type === "reference" &&
        !(
          typeof a.value.value === "string" && a.value.value.startsWith("@ctx.")
        )
      ) {
        value = options.evaluate(value);
      }

      if (cast) {
        value = castValue(value, cast);
      }

      return { value };
    });

    parsedNode = {
      group: "util",
      name: call.name,
      command: null,
      reference: null,
      target: null,
      commandArgs: commandArgs,
      args,
    };
  }

  if (node.type === "normal") {
    const normal = node as NormalNode;

    const target = (t: NormalNode["target"]) => {
      if (!t) return null;

      let value = t.value;

      value = resolveContextRefs(value, options);

      if (
        t.type === "reference" &&
        !(typeof t.value === "string" && t.value.startsWith("@ctx."))
      ) {
        value = options.evaluate(t.value);
      }

      if (t.cast) {
        value = castValue(value, t.cast);
      }

      return value;
    };

    parsedNode = {
      group: normal.group,
      name: null,
      command: normal.command,
      reference: normal.reference,
      target: { value: target(normal.target) },
      commandArgs: commandArgs,
      args: null,
    };
  }

  if (node.type === "scope_use") {
    parsedNode = {
      group: null,
      name: null,
      command: node.command,
      reference: null,
      target: null,
      args: null,
      commandArgs: commandArgs,
    };
  }

  return parsedNode;
}
