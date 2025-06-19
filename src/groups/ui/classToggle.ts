import { accessVariable } from "@/utils/accessVariable";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export function classToggle(
  el: HTMLElement,
  alpine: AlpineComponent<any>
): string {
  const ctx = useContext(alpine, alpine, "classToggle", "var", true);
  const cp = ctx.cp;

  const varName = ctx.varName;

  const toggleTrue = resolveData(ctx.dataset, ctx.fn, "true", true) || "";
  const toggleFalse = resolveData(ctx.dataset, ctx.fn, "false", true) || "";

  return accessVariable(cp, varName) ? toggleTrue : toggleFalse;
}
