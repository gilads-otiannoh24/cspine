import { Options } from "@/CSPine";
import { withContext } from "@/utils/withContext";

export function join(el: HTMLElement, options: Options): string {
  const str = withContext<string>(
    el,
    "join",
    "string",
    options,
    true,
    ({ ctx }) => {
      const parsed = ctx.parsed;
      const { evaluate } = options;

      if (!parsed) return "";

      const variable = evaluate(parsed.reference as string);

      if (typeof variable !== "string") return "";
      const { separator, order } = parsed.commandArgs.named;

      let value =
        separator && separator.value && parsed.target?.value
          ? order && order.value === "bwd"
            ? parsed.target.value + separator.value + variable
            : variable + separator.value + parsed.target.value
          : parsed.target?.value
          ? order && order.value === "bwd"
            ? parsed.target.value + variable
            : variable + parsed.target.value
          : variable;

      return value;
    }
  );

  return str || "";
}
