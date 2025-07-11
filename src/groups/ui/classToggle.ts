import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function classToggle(el: HTMLElement, options: Options): string {
  const ctx = useContext(el, "classToggle", options, true);

  const node = ctx.parsed;
  if (!node) {
    warnEmptyNode(ctx.fn, "ui", el);
    return "";
  }
  const classTrue = node.commandArgs.positional[0] || "";
  const classFalse = node.commandArgs.positional[1] || "";
  const variable = options.evaluate(node.reference as string);

  if (node.target?.value) {
    return variable === node.target.value ? classTrue : classFalse;
  }

  return variable ? classTrue : classFalse;
}
