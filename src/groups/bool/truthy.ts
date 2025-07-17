import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function truthy(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "truthy", group: "bool" }, options, true);

  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, ctx.group, el);
    return false;
  }

  const varName = node.reference as string;
  const variable = options.evaluate(varName);

  return variable !== undefined && variable !== null && variable !== false;
}
