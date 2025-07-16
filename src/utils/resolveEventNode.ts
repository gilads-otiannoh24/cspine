import { ASTNode } from "@/v2/dsl/types";
import { parseNode } from "./parseNode";
import { Options } from "@/CSPine";

export function resolveEventNode(nodes: ASTNode[], options: Options) {
  const { e: event } = options;

  const node =
    nodes.filter((n) => {
      const parsed = parseNode(n, options);
      if (!parsed) return false;

      const { event: eventArg } = parsed.commandArgs.named;

      if (event && eventArg && eventArg.value) {
        const values = eventArg.otherValues.value;
        values.push(eventArg.value);

        return values.includes(event.type);
      }

      return false;
    }) || null;
  let parsed;

  if (node && node[0]) parsed = parseNode(node[0], options);

  return { node, parsed };
}
