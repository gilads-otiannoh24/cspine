import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function empty(el: HTMLElement, options: Options): boolean {
  const ctx = useContext(el, "empty", options, true);
  const parsed = ctx.parsed;

  if (!parsed) {
    warnEmptyNode(ctx.fn, "state", el);
    return false;
  }

  const varName = parsed?.reference as string;
  const variable = options.evaluate(varName);

  if (variable === null || variable === undefined) return true;

  if (typeof variable === "string") return variable === "";
  else if (typeof variable === "object")
    return Object.keys(variable).length === 0;
  else if (Array.isArray(variable)) return variable.length === 0;
  else return false;
}
