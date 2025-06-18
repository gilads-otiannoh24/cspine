import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export function falsy(el: HTMLElement, alpine: AlpineComponent<any>) {
  const ctx = useContext(alpine, alpine, "isFalse", "var", true);

  const cp = ctx.cp;

  const varName = ctx.varName;
  const variable = accessVariable(cp, varName);

  if (typeof variable === "boolean") {
    return variable === false;
  } else {
    console.warn(
      "CSPUtils::bool.isFalse - Variable cannot be toggled as it is not a boolean",
      el
    );
  }

  return false;
}
