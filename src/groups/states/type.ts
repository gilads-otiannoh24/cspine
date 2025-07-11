import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function type(el: HTMLElement, options: Options) {
  const ctx = useContext(el, "type", options, true);

  if (!ctx.parsed) {
    warnEmptyNode(ctx.fn, "state", el);
    return false;
  }

  const node = ctx.parsed;

  const varName = node.reference as string;
  const variable = options.evaluate(varName);
  const type = node.target?.value;

  if (type === "array") return Array.isArray(variable);
  if (type === "null") return variable === null;
  if (type === "undefined") return variable === undefined;

  return typeof variable === type;
}
