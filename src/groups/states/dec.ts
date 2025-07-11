import { Options } from "@/CSPine";
import { setVariable } from "@/utils/accessVariable";
import { parseNode } from "@/utils/parseNode";
import { useContext } from "@/utils/useContext";
import { ASTNode } from "@/v2/dsl/types";

export function dec(el: HTMLElement, options: Options) {
  const ctx = useContext(el, "dec", options, true);
  const node = ctx.nodes;

  if (node) {
    const parsed = parseNode(node as ASTNode, options);
    const varName = parsed?.reference;
    let variable = options.evaluate(varName as string);

    const cp = options.this;

    if (typeof variable === "number") {
      setVariable(cp, varName as string, --variable);
    } else {
      console.warn(
        "CSPUtils::state.dec - Variable cannot be incremented as it is not a number\n",
        el
      );
    }
  }
}
