import { Config, Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function classToggle(el: HTMLElement, options: Options): string {
  const ctx = useContext(el, "classToggle", options, true);
  if (!ctx.parsed) {
    warnEmptyNode(ctx.fn, "ui", el);
    return "";
  }

  const node = ctx.parsed;
  const classTrue = ctx.parsed.commandArgs.positional[0] || "";
  const classFalse = ctx.parsed.commandArgs.positional[1] || "";

  return options.evaluate(node.reference as string) ? classTrue : classFalse;
}
