import { MagicUtilitiesWithContext } from "@/CSPine";
import { setVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { MagicUtilities } from "alpinejs";

export function inc(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "inc", "var", true);

  let variable = options.evaluate(ctx.varName);

  if (typeof variable === "number") {
    setVariable(options.this, ctx.varName, ++variable);
  } else {
    console.warn(
      "CSPUtils::inc - Variable cannot be incremented as it is not a number",
      el
    );
  }
}
