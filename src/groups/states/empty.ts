import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export function empty(el: HTMLElement, alpine: AlpineComponent<any>) {
  const ctx = useContext(alpine, alpine, "empty", "var", true);

  const varName = ctx.varName;
  const variable = accessVariable(ctx.cp, varName);

  if (typeof variable === "string") return variable === "";
  else if (typeof variable === "object")
    return Object.keys(variable).length === 0;
  else if (Array.isArray(variable)) return variable.length === 0;
  else return false;
}
