import { MagicUtilitiesWithContext } from "@/CSPine";
import { useContext } from "@/utils/useContext";

export function bindTo($el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext($el, "bindTo", "bindTo", true);
  const expr = ctx.varName;

  /*  try {
      const [target, expression] = expr.split("=").map((x: string) => x.trim());
      const fn = new Function("with(this) { return " + expression + " }");
      accessVariable(this, target, "set", fn.call(this));
    } catch (err) {
      console.warn(
        `CSPUtils::bindTo - Failed to evaluate expression: ${expr}`,
        this,
        err
      );
    } */
}
