import { Options } from "@/CSPine";
import { setVariable } from "@/utils/accessVariable";
import { warn as warnE } from "@/utils/issueWarning";
import { parseNode } from "@/utils/parseNode";
import { resolveEventNode } from "@/utils/resolveEventNode";
import { useContext } from "@/utils/useContext";
import { ASTNode, NormalNode } from "@/v2/dsl/types";

export function swap(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "swap", group: "state" }, options);
  const { fn, group, nodes } = ctx;
  const warn = warnE(fn, group, el);

  if (!nodes) return warn.emptyNode();

  let nodesToProcess = nodes;
  const eventNode = resolveEventNode(nodes, options);
  if (eventNode.node.length) nodesToProcess = eventNode.node;

  nodesToProcess.forEach((n) => evaluateNode(n, options));
}

function evaluateNode(node: ASTNode, options: Options) {
  const parsed = parseNode(node, options);
  const { evaluate, this: cp } = options;

  if (!parsed) return;

  const normalNode = node as NormalNode;

  if (normalNode?.target?.type !== "reference") return;

  const varName1 = parsed.reference as string;
  const varName2 = normalNode.target.value as string;
  const val1 = evaluate(parsed.reference as string);
  const val2 = parsed.target?.value as string;

  setVariable(cp, varName1, val2);
  setVariable(cp, varName2, val1);
}
