import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function truthy(el: HTMLElement, options: Options) {
  const ctx = useContext(el, "truthy", options, true);

  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, "bool", el);
    return false;
  }

  const varName = node.reference as string;
  const variable = options.evaluate(varName);

  if (typeof variable === "boolean") {
    return variable === true;
  } else {
    console.warn(
      "CSPUtils::bool.isTrue - Variable cannot be toggled as it is not a boolean\n",
      el
    );
  }

  return false;
}
