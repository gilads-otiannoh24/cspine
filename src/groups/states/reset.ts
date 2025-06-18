import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export function reset(el: HTMLElement, alpine: AlpineComponent<any>) {
  const ctx = useContext(alpine, alpine, "reset", "var", true);

  const cp = ctx.cp;

  let varName = ctx.varName;

  const variable = accessVariable(cp, varName);

  if (typeof variable === "string") accessVariable(cp, varName, "set", "");
  else if (Array.isArray(variable)) accessVariable(cp, varName, "set", []);
  else if (typeof variable === "object") accessVariable(cp, varName, "set", {});
  else accessVariable(cp, varName, "set", null);
}
