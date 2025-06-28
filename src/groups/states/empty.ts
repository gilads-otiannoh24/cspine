import { MagicUtilitiesWithContext } from "@/CSPine";
import { useContext } from "@/utils/useContext";

export function empty(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "empty", "var", true);

  const varName = ctx.varName;
  const variable = options.evaluate(varName);

  if (variable === null || variable === undefined) return true;

  if (typeof variable === "string") return variable === "";
  else if (typeof variable === "object")
    return Object.keys(variable).length === 0;
  else if (Array.isArray(variable)) return variable.length === 0;
  else return false;
}
