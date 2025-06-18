import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export function not(el: HTMLElement, alpine: AlpineComponent<any>) {
  const ctx = useContext(alpine, alpine, "negate", "var", true);

  const cp = ctx.cp;

  const varName = ctx.varName;
  const variable = accessVariable(cp, varName);

  return !variable;
}
