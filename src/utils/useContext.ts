import { Options } from "@/CSPine";
import { resolveData } from "./resolveDatasetValue";
import { parseNode } from "./parseNode";
import { ASTNode } from "@/v2/dsl/types";

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

  let nodes = resolveData(el, { fn, group }, singleRecord);
  let parsed;

  if (singleRecord) {
    parsed = parseNode(nodes as ASTNode, options);
  }

  return { nodes, fn, parsed, group };
}
