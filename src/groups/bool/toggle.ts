import { MagicUtilitiesWithContext } from "@/CSPine";
import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";

export function toggle(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "toggle", "var", true);

  const cp = options.this;

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
