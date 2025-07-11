import { Options } from "@/CSPine";
import { accessVariable, setVariable } from "@/utils/accessVariable";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function reset(el: HTMLElement, options: Options) {
  const ctx = useContext(el, "reset", options, true);

  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, "state", el);
    return;
  }

  let varName = node.reference as string;
  const cp = options.this;

  const variable = accessVariable(cp, varName);

  if (typeof variable === "string") setVariable(cp, varName, "");
  else if (Array.isArray(variable)) setVariable(cp, varName, []);
  else if (typeof variable === "object") setVariable(cp, varName, {});
  else accessVariable(cp, varName, "set", null);
}
