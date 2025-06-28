import { MagicUtilitiesWithContext } from "@/CSPine";
import { setVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { MagicUtilities } from "alpinejs";

export function dec(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "dec", "var", true);

  const varName = ctx.varName;
  let variable = options.evaluate(varName);
  const cp = options.this;

  if (typeof variable === "number") {
    setVariable(cp, varName, --variable);
  } else {
    console.warn(
      "CSPUtils::state.dec - Variable cannot be incremented as it is not a number",
      el
    );
  }
}
