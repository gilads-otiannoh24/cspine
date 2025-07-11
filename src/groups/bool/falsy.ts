import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function falsy(el: HTMLElement, options: Options) {
  const ctx = useContext(el, "falsy", options, true);
  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, "bool", el);
    return false;
  }

  const varName = node.reference as string;
  const variable = options.evaluate(varName);

  console.log("CSPUtils::bool.isFalse - Variable:", variable);

  if (typeof variable === "boolean") {
    return variable === false;
  } else {
    console.warn(
      "CSPUtils::bool.isFalse - Variable cannot be toggled as it is not a boolean\n",
      el
    );
  }

  return false;
}
