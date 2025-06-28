import { MagicUtilitiesWithContext } from "@/CSPine";
import { accessVariable } from "@/utils/accessVariable";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";

export function type(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "type", "var", true);
  const cp = options.this;

  const varName = ctx.varName;
  const variable = accessVariable(cp, varName);

  const type = resolveData(ctx.dataset, ctx.fn, "type", true);

  if (type === "array") return Array.isArray(variable);
  if (type === "null") return variable === null;
  if (type === "undefined") return variable === undefined;

  return typeof variable === type;
}
