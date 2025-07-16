import { Options } from "@/CSPine";
import { accessVariable } from "@/utils/accessVariable";
import { warnEmptyNode, warn as warnE } from "@/utils/issueWarning";
import { parseNode } from "@/utils/parseNode";
import { resolveEventNode } from "@/utils/resolveEventNode";
import { useContext } from "@/utils/useContext";
import { ASTNode } from "@/v2/dsl/types";

export function toggle(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "toggle", group: "bool" }, options, true);
  const {} = options.this;
  const { nodes, fn, group } = ctx;
  const warn = warnE(fn, group, el);

  if (!nodes) {
    warn.emptyNode();
    return false;
  }

  let nodesToProcess = nodes;
  const eventNodes = resolveEventNode(nodes, options);

  if (eventNodes.node.length) nodesToProcess = eventNodes.node;

  nodesToProcess.forEach((n) => evaluateNode(n, options, el));
}

function evaluateNode(node: ASTNode, options: Options, el: HTMLElement) {
  const { evaluate, this: cp } = options;
  const parsed = parseNode(node, options);

  if (!parsed) return;

  const varName = parsed.reference as string;
  const variable = evaluate(varName);

  if (typeof variable === "boolean") {
    accessVariable(cp, varName, "set", !variable);
  } else {
    console.warn(
      "CSPUtils::bool.toggle - Variable cannot be toggled as it is not a boolean\n",
      el
    );
  }
}
