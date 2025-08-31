import { Options } from "@/CSPine";
import { resolveData } from "./resolveDatasetValue";
import { parseNode } from "./parseNode";

export function useContext(
  el: HTMLElement,
  fnNmae: string | { fn: string; group: string },
  options: Options,
  singleRecord?: boolean
) {
  let fn = "";
  let group = "";
  if (typeof fnNmae === "string") {
    fn = fnNmae;
  } else {
    fn = fnNmae.fn;
    group = fnNmae.group;
  }

  let nodes = resolveData(el, { fn, group });
  let parsed;
  let node = nodes[0] ?? undefined;

  if (nodes.length) {
    parsed = parseNode(nodes[0], options);
  }

  return { nodes, node, fn, parsed, group };
}
