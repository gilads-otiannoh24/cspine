import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { BinaryOperator, resolveOperator } from "@/utils/resolveOperator";
import { useContext } from "@/utils/useContext";

export function classToggle(el: HTMLElement, options: Options): string {
  const ctx = useContext(el, "classToggle", options, true);
  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, "ui", el);
    return "";
  }

  const { operator } = node.commandArgs.named;
  const [classTrue = "", classFalse = ""] = node.commandArgs.positional;

  const variable = options.evaluate(node.reference as string);

  if (node.target?.value) {
    return (
      operator
        ? resolveOperator(
            operator.value as BinaryOperator,
            variable,
            node.target.value
          )
        : variable === node.target.value
    )
      ? classTrue
      : classFalse;
  }

  return variable ? classTrue : classFalse;
}
