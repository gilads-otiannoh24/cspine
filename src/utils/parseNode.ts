import { Options } from "@/CSPine";
import { castValue } from "./castValue";
import { ASTNode, CallNode, NormalNode } from "@/v2/dsl/types";

type CommandArg = {
  named: Record<string, { value: any; escaped: boolean; escapedValue: any }>;
  positional: any[];
};

type CallArg = {
  value: any;
};

export interface ParsedNode {
  command: string | null;
  reference: string | null;
  target: {
    value: any;
  } | null;
  name: string | null;
  args: CallArg[] | null;
  commandArgs: CommandArg;
}

export function parseNode(
  node: ASTNode,
  options: Options,
  log: boolean = false
): ParsedNode | null {
  let parsedNode: ParsedNode | null = null;

  if (node.type === "call") {
    const call = node as CallNode;

    const args = call.args.map((a) => {
      let value = a.value.value;
      const cast = a.value.cast;
      const type = a.value.type;

      if (type === "reference") {
        value = options.evaluate(value);
      }

      if (cast) {
        value = castValue(value, cast);
      }

      return { value };
    });

    parsedNode = {
      name: call.name,
      command: null,
      reference: null,
      target: null,
      commandArgs: call.commandArgs,
      args,
    };
  }

  if (node.type === "normal") {
    const normal = node as NormalNode;

    const target = (t: NormalNode["target"]) => {
      if (!t) return null;

      let value = t.value;
      if (t.type === "reference") {
        value = options.evaluate(t.value);
      }

      if (t.cast) {
        value = castValue(value, t.cast);
      }

      return value;
    };

    parsedNode = {
      name: null,
      command: normal.command,
      reference: normal.reference,
      target: { value: target(normal.target) },
      commandArgs: normal.commandArgs,
      args: null,
    };
  }

  return parsedNode;
}
