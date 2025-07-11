import { Options } from "@/CSPine";
import { setVariable } from "@/utils/accessVariable";
import { warnEmptyNode } from "@/utils/issueWarning";
import { parseNode } from "@/utils/parseNode";
import { useContext } from "@/utils/useContext";

export function set(el: HTMLElement, options: Options) {
  const ctx = useContext(el, "set", options);

  const cp = options.this;
  const nodes = ctx.nodes;

  if (!nodes) return warnEmptyNode(ctx.fn, "state", el);

  if (Array.isArray(nodes)) {
    nodes.forEach((node) => {
      const parsed = parseNode(node, options);

      if (parsed?.reference && parsed?.target) {
        setVariable(cp, parsed?.reference, parsed.target.value);
      }
    });
  }
}
