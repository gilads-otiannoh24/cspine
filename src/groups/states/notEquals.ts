import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";

export function notEquals(el: HTMLElement, options: Options) {
  const ctx = useContext(el, "notEquals", options, true);

  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, "state", el);
    return false;
  }

  const varName = node.reference as string;
  const variable = options.evaluate(varName);
  const value = node.target?.value;

  return value !== variable;
}
