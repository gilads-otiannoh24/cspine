import { MagicUtilitiesWithContext } from "@/CSPine";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";

export function lessThanOrEqual(
  el: HTMLElement,
  options: MagicUtilitiesWithContext
) {
  const ctx = useContext(el, "greaterThan", "var", true);

  const variable = options.evaluate(ctx.varName);
  const value = resolveData(ctx.dataset, ctx.fn, "value", true);

  if (
    variable === undefined ||
    value === undefined ||
    variable === null ||
    value === null
  ) {
    return false;
  }

  return variable <= value;
}
