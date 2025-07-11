import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { parseNode } from "@/utils/parseNode";
import { useContext } from "@/utils/useContext";
import { ASTNode } from "@/v2/dsl/types";

export function call(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "call", group: "util" }, options);
  const nodes = ctx.nodes;

  if (!nodes) {
    warnEmptyNode(ctx.fn, ctx.group, el);
    return;
  }

  (nodes as ASTNode[]).forEach((node) => {
    const parsed = parseNode(node, options);

    options.evaluate(parsed?.name as string, {
      params: parsed?.args?.map((a) => a.value),
    });
  });
}
