import { Options } from "@/CSPine";
import { setVariable } from "@/utils/accessVariable";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function inc(el: HTMLElement, options: Options) {
  const ctx = useContext(el, "inc", options, true);
  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, "state", el);
    return;
  }

  const varName = node?.reference as string;
  let variable = options.evaluate(varName);

  if (typeof variable === "number") {
    setVariable(options.this, varName, ++variable);
  } else {
    console.warn(
      "CSPUtils::inc - Variable cannot be incremented as it is not a number\n",
      el
    );
  }
}
