import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function falsy(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "falsy", group: "bool" }, options, true);
  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, ctx.group, el);
    return false;
  }

  const varName = node.reference as string;
  const variable = options.evaluate(varName);
  return (
    variable === false ||
    variable === 0 ||
    variable === "" ||
    variable === null ||
    variable === undefined
  );
}
