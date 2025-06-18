import { accessVariable } from "@/utils/accessVariable";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export function set(el: HTMLElement, alpine: AlpineComponent<any>) {
  const ctx = useContext(alpine, alpine, "set");

  const cp = ctx.cp;

  const varName = ctx.varName;
  const value = resolveData(ctx.dataset, ctx.fn, "value");

  if (Array.isArray(varName)) {
    varName.forEach((v: string, index: number) => {
      if (value[index] !== undefined) {
        accessVariable(cp, v, "set", value[index]);
      }
    });
  } else {
    accessVariable(cp, varName, "set", value);
  }
}
