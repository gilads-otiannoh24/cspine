import { Options } from "@/CSPine";
import { warn as warnE } from "@/utils/issueWarning";
import { parseNode } from "@/utils/parseNode";
import { resolveEventNode } from "@/utils/resolveEventNode";
import { useContext } from "@/utils/useContext";
import { ASTNode } from "@/v2/dsl/types";

export function validate(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "validate", group: "form" }, options, true);
  const { nodes, fn, group } = ctx;

  const warn = warnE(fn, group, el);

  if (!nodes.length) warn.emptyNode();

  const eventNode = resolveEventNode(nodes, options);

  if (eventNode.node.length) return evaluateNode(eventNode.node[0], options);

  nodes.forEach((n) => evaluateNode(n, options));
}

const evaluateNode = (node: ASTNode, options: Options) => {
  const parsed = parseNode(node, options);
};
