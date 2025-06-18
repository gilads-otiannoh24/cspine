import { accessVariable } from "@/utils/accessVariable";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export function type(el: HTMLElement, alpine: AlpineComponent<any>) {
  const ctx = useContext(alpine, alpine, "negate", "var", true);

  const cp = ctx.cp;

  const varName = ctx.varName;
  const variable = accessVariable(cp, varName);

  const type = resolveData(ctx.dataset, ctx.fn, "type", true);

  if (type === "array") return Array.isArray(variable);
  if (type === "null") return variable === null;
  if (type === "undefined") return variable === undefined;

  return typeof variable === type;
}
