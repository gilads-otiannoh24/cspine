import { Options } from "@/CSPine";
import { accessVariable } from "@/utils/accessVariable";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function toggle(el: HTMLElement, options: Options) {
  const ctx = useContext(el, "toggle", options, true);

  const cp = options.this;

  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, "bool", el);
    return false;
  }

  const varName = node.reference as string;
  const variable = options.evaluate(varName);

  if (typeof variable === "boolean") {
    accessVariable(cp, varName, "set", !variable);
  } else {
    console.warn(
      "CSPUtils::bool.toggle - Variable cannot be toggled as it is not a boolean\n",
      el
    );
  }
}
