import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function not(el: HTMLElement, options: Options) {
  const ctx = useContext(el, "not", options, true);

  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, "state", el);
    return false;
  }

  const varName = node.reference as string;
  const variable = options.evaluate(varName);

  return !variable;
}
