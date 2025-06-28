import { MagicUtilitiesWithContext } from "@/CSPine";
import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { AlpineComponent, MagicUtilities } from "alpinejs";

export function truthy(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "isTrue", "var", true);

  const cp = options.this;

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
