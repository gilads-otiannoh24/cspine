import { Options } from "@/CSPine";
import { setVariable } from "@/utils/accessVariable";
import { warnEmptyNode } from "@/utils/issueWarning";
import { parseNode } from "@/utils/parseNode";
import { resolveEventNode } from "@/utils/resolveEventNode";
import { useContext } from "@/utils/useContext";
import { ASTNode } from "@/v2/dsl/types";

export function reset(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "reset", group: "state" }, options, true);
  const { nodes } = ctx;

  if (!nodes) {
    warnEmptyNode(ctx.fn, "state", el);
    return;
  }
  let nodesToProcess = nodes;

  const eventNode = resolveEventNode(nodes, options);

  if (eventNode.node.length) nodesToProcess = eventNode.node;

  nodesToProcess.forEach((n) => evaluateNode(n, options));
}

function evaluateNode(node: ASTNode, options: Options) {
  const { this: cp, evaluate } = options;
  const parsed = parseNode(node, options);

  if (!parsed) return;

  let varName = parsed.reference as string;
  const variable = evaluate(varName);
  resetState(variable, cp, varName);
}

export function resetState(variable: any, cp: ThisType<any>, varName: string) {
  if (typeof variable === "string") setVariable(cp, varName, "");
  else if (Array.isArray(variable)) setVariable(cp, varName, []);
  else if (typeof variable === "object") setVariable(cp, varName, {});
  else setVariable(cp, varName, null);
}
