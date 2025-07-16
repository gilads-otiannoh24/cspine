import { Options } from "@/CSPine";
import { castValue } from "@/utils/castValue";
import { RESERVED_ARG_KEYWORDS } from "@/utils/constants";
import { warnEmptyNode } from "@/utils/issueWarning";
import { BinaryOperator, resolveOperator } from "@/utils/resolveOperator";
import { useContext } from "@/utils/useContext";

export function classes(el: HTMLElement, options: Options): string {
  const ctx = useContext(el, "class", options, true);

  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, "ui", el);
    return "";
  }

  let variable = options.evaluate(node.reference as string);

  const {
    default: defaultClass,
    cast,
    operator,
    ...others
  } = node.commandArgs.named;

  const classStr =
    others[
      Object.keys(others).filter((x) => {
        const namedVar = others[x];
        const otherVals = namedVar.escaped
          ? namedVar.otherValues.escaped
          : namedVar.otherValues.value;

        const value = cast && cast.value ? castValue(x, cast.value) : x;

        try {
          if (otherVals.length) {
            return resolveOperator(
              otherVals[0] as BinaryOperator,
              variable,
              value
            );
          }

          if (operator) {
            return resolveOperator(
              operator.value as BinaryOperator,
              variable,
              value
            );
          }

          return resolveOperator("===", variable, value);
        } catch (error) {
          console.warn(error);
          return false;
        }
      })[0] || ""
    ];

  let escaped = false;
  if (RESERVED_ARG_KEYWORDS.includes(variable as string)) escaped = true;

  if (!classStr || typeof classStr?.value !== "string")
    return defaultClass?.value || "";

  return escaped && classStr.escaped
    ? classStr?.escapedValue || ""
    : classStr?.value || "";
}
