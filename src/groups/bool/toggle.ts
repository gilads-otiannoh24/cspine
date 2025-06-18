import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export function toggle(el: HTMLElement, alpine: AlpineComponent<any>) {
  const ctx = useContext(alpine, alpine, "toggle", "var", true);

  const cp = ctx.cp;

  const varName = ctx.varName;
  const variable = accessVariable(cp, varName);

  if (typeof variable === "boolean") {
    accessVariable(cp, varName, "set", !variable);
  } else {
    console.warn(
      "CSPUtils::bool.toggle - Variable cannot be toggled as it is not a boolean",
      el
    );
  }
}
