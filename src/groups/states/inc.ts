import { Options } from "@/CSPine";
import { setVariable } from "@/utils/accessVariable";
import { warn as warnE } from "@/utils/issueWarning";
import { parseNode } from "@/utils/parseNode";
import { resolveEventNode } from "@/utils/resolveEventNode";
import { useContext } from "@/utils/useContext";
import { ASTNode } from "@/v2/dsl/types";

export function inc(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "inc", group: "state" }, options, true);
  const { nodes } = ctx;
  const warn = warnE(ctx.fn, ctx.group, el);

  if (!nodes) return warn.emptyNode();

  let nodesToProcess = nodes;
  const eventNode = resolveEventNode(nodes, options);

  if (eventNode.node.length) nodesToProcess = eventNode.node;

  nodesToProcess.forEach((n) => evaluateNode(n, options, el));
}

function evaluateNode(node: ASTNode, options: Options, el: HTMLElement) {
  const { this: cp, evaluate } = options;
  const parsed = parseNode(node, options);

  const varName = parsed?.reference as string;
  let variable = evaluate(varName);

  if (typeof variable === "number") {
    setVariable(cp, varName, --variable);
  } else {
    console.warn(
      "CSPUtils::state.dec - Variable cannot be incremented as it is not a number\n",
      el
    );
  }
}
