import { MagicUtilitiesWithContext } from "@/CSPine";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";

export function equals(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "equals", "var", true);

  const variable = options.evaluate(ctx.varName);
  const value = resolveData(ctx.dataset, ctx.fn, "value", true);

  return value === variable;
}
