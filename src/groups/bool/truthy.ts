import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export function truthy(el: HTMLElement, alpine: AlpineComponent<any>) {
  const ctx = useContext(alpine, alpine, "isTrue", "var", true);

  const cp = ctx.cp;

  const varName = ctx.varName;
  const variable = accessVariable(cp, varName);

  if (typeof variable === "boolean") {
    return variable === true;
  } else {
    console.warn(
      "CSPUtils::bool.isTrue - Variable cannot be toggled as it is not a boolean",
      el
    );
  }

  return false;
}
