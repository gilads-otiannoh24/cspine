import { MagicUtilitiesWithContext } from "@/CSPine";
import { useContext } from "@/utils/useContext";

export function not(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "not", "var", true);

  const variable = options.evaluate(ctx.varName);

  return !variable;
}
