import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { parseNode } from "@/utils/parseNode";
import { resolveEventNode } from "@/utils/resolveEventNode";
import { useContext } from "@/utils/useContext";
import { ASTNode } from "@/v2/dsl/types";

export function call(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "call", group: "util" }, options);
  const { nodes, fn, group } = ctx;

  if (!nodes) return warnEmptyNode(fn, group, el);
  if (nodes.length === 1) return evaluateNode(nodes[0], options);

  const eventNode = resolveEventNode(nodes, options);

  if (eventNode.node) return evaluateNode(eventNode.node, options);

  nodes.forEach((node) => {
    evaluateNode(node, options);
  });
}

const evaluateNode = (node: ASTNode, options: Options) => {
  const parsed = parseNode(node, options);

  if (!parsed) return;

  const event = options.e;
  const { event: eventArg } = parsed?.commandArgs.named;

  if (event && eventArg && eventArg.value && event.type !== eventArg.value) {
    return;
  }

  return options.evaluate(parsed?.name as string, {
    params: parsed.args?.map((a) => a.value),
  });
};
