import { Options } from "@/CSPine";
import { warn as warnE } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";
import { resetState } from "../states/reset";
import { setVariable } from "@/utils/accessVariable";
import { resolveEventNode } from "@/utils/resolveEventNode";
import { ASTNode } from "@/v2/dsl/types";
import { parseNode } from "@/utils/parseNode";

export function reset(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "update", group: "form" }, options);
  const { fn, group, node, nodes } = ctx;
  const warn = warnE(fn, group, el);

  if (!nodes || !node) return warn.emptyNode();

  const eventNode = resolveEventNode(nodes, options);
  if (eventNode.node.length) return evaluateNode(eventNode.node[0], options);

  return evaluateNode(node, options);
}

const evaluateNode = (node: ASTNode, options: Options) => {
  const parsed = parseNode(node, options);
  if (!parsed) return;

  const { evaluate, e: event, this: cp } = options;

  const { reference, target } = parsed;
  const { event: eventArg } = parsed.commandArgs.named;

  if (event && eventArg && eventArg.value && eventArg.value !== event.target)
    return;

  const variable = evaluate(reference as string);

  if (target && target.value) {
    return setVariable(cp, reference as string, target.value);
  }

  resetState(variable, cp, reference as string);
};
