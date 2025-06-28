import { MagicUtilitiesWithContext } from "@/CSPine";
import { accessVariable } from "@/utils/accessVariable";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";
import { MagicUtilities } from "alpinejs";

export function classToggle(
  el: HTMLElement,
  options: MagicUtilitiesWithContext
): string {
  const ctx = useContext(el, "classToggle", "var", true);
  const cp = options.this;

  const varName = ctx.varName;

  const toggleTrue = resolveData(ctx.dataset, ctx.fn, "true", true) || "";
  const toggleFalse = resolveData(ctx.dataset, ctx.fn, "false", true) || "";

  return accessVariable(cp, varName) ? toggleTrue : toggleFalse;
}
