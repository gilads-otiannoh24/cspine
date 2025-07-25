import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";

export function greaterThan(el: HTMLElement, options: Options) {
  const ctx = useContext(
    el,
    { fn: "greaterThan", group: "state" },
    options,
    true
  );

  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, "state", el);
    return false;
  }

  const varName = node.reference as string;
  const variable = options.evaluate(varName);
  const value = node.target?.value;
  if (
    variable === undefined ||
    value === undefined ||
    variable === null ||
    value === null
  ) {
    return false;
  }

  return variable > value;
}
