import { MagicUtilitiesWithContext } from "@/CSPine";
import { useContext } from "@/utils/useContext";

export function log(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "log", "var");

  if (!Array.isArray(ctx.varName)) {
    return console.log(options.evaluate(ctx.varName));
  }

  const varNames = ctx.varName;

  varNames.forEach((varName) => {
    console.log(options.evaluate(varName));
  });
}
