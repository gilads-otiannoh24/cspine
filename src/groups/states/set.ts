import { MagicUtilitiesWithContext } from "@/CSPine";
import { accessVariable } from "@/utils/accessVariable";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";

export function set(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "set", "var");

  const cp = options.this;

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
