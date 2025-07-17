import { Options } from "@/CSPine";
import { setVariable } from "@/utils/accessVariable";
import { warnEmptyNode } from "@/utils/issueWarning";
import { parseNode } from "@/utils/parseNode";
import { resolveEventNode } from "@/utils/resolveEventNode";
import { useContext } from "@/utils/useContext";
import { ASTNode } from "@/v2/dsl/types";

export function set(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "set", group: "state" }, options);

  const nodes = ctx.nodes;

  if (!nodes) return warnEmptyNode(ctx.fn, ctx.group, el);
  let nodesToProcess = nodes;

  const eventNode = resolveEventNode(nodes, options);

  if (eventNode.node) nodesToProcess = eventNode.node;

  nodesToProcess.forEach((node) => evaluateNode(node, options));
}

const evaluateNode = (node: ASTNode, options: Options) => {
  const parsed = parseNode(node, options);
  const cp = options.this;

  if (parsed?.reference && parsed?.target) {
    setVariable(cp, parsed?.reference, parsed.target.value);
  }
};
