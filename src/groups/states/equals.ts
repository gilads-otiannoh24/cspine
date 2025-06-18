import { accessVariable } from "@/utils/accessVariable";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export function equals(el: HTMLElement, alpine: AlpineComponent<any>) {
  const ctx = useContext(alpine, alpine, "equals", "var", true);

  const variable = accessVariable(ctx.cp, ctx.varName);
  const value = resolveData(ctx.dataset, ctx.fn, "value", true);

  if (variable === undefined || value === undefined) {
    return false;
  }

  return value === variable;
}
