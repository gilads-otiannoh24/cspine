import { Options } from "@/CSPine";
import { BinaryOperator, resolveOperator } from "@/utils/resolveOperator";
import { withContext } from "@/utils/withContext";

export function filter(el: HTMLElement, options: Options): any[] {
  const arr = withContext(
    el,
    "filter",
    "array",
    options,
    true,
    ({ ctx, warn }) => {
      const { parsed } = ctx;
      const { evaluate } = options;

      if (!parsed) return [];
      // Usage: array.filter:arr->14(number)|age,operator=">"

      const { operator } = parsed.commandArgs.named;
      const [prop] = parsed.commandArgs.positional;

      const arr = evaluate(parsed.reference as string);

      if (!Array.isArray(arr)) return [];

      return arr.filter((a) => {
        let val = a;

        if (prop) {
          prop.split(".").forEach((p) => (val = val?.[p]));
        }

        if (!operator?.value) return val;
        return resolveOperator(
          operator.value as BinaryOperator,
          val,
          parsed.target?.value
        );
      });
    },
    []
  );

  return (arr as any[]) || [];
}
