import { Options } from "@/CSPine";
import { warn as warnE } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function empty(el: HTMLElement, options: Options): boolean {
  const ctx = useContext(el, { fn: "empty", group: "state" }, options, true);
  const { parsed, fn, group, nodes } = ctx;
  const warn = warnE(fn, group, el);

  if (!parsed) {
    warn.emptyNode();
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
