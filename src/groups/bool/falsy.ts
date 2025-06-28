import { MagicUtilitiesWithContext } from "@/CSPine";
import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { AlpineComponent, MagicUtilities } from "alpinejs";

export function falsy(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "isFalse", "var", true);

  const cp = options.this;

  const varName = ctx.varName;
  const variable = accessVariable(cp, varName);

  console.log("CSPUtils::bool.isFalse - Variable:", variable);

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
