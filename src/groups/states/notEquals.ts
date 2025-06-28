import { MagicUtilitiesWithContext } from "@/CSPine";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";

export function notEquals(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "notEquals", "var", true);

  const variable = options.evaluate(ctx.varName);
  const value = resolveData(ctx.dataset, ctx.fn, "value", true);

  return value !== variable;
}
