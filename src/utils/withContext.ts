import { Options } from "@/CSPine";
import { warn as warnE } from "./issueWarning";
import { useContext } from "./useContext";
import { ASTNode } from "@/v2/dsl/types";
import { resolveEventNode } from "./resolveEventNode";

export function withContext<T>(
  el: HTMLElement,
  fn: string,
  group: string,
  options: Options,
  singleEntry = false,
  callback: (args: {
    ctx: ReturnType<typeof useContext>;
    warn?: ReturnType<typeof warnE>;
  }) => any,
  returnVar: any = ""
): T | void {
  const ctx = useContext(el, { fn, group }, options, singleEntry);
  const warn = warnE(fn, group, el);
  const nodes = ctx.nodes;

  if (!nodes) {
    warn.emptyNode();
    return returnVar;
  }

  return callback({ ctx, warn });
}

export function withContextParsed(
  el: HTMLElement,
  fn: string,
  group: string,
  options: Options,
  callback: (args: {
    ctx: ReturnType<typeof useContext>;
    nodes: ASTNode[];
    warn: ReturnType<typeof warnE>;
  }) => any,
  returnVar: any = ""
) {
  const ctx = useContext(el, { fn, group }, options);
  const warn = warnE(fn, group, el);

  if (!ctx.nodes) {
    warn.emptyNode();
    return returnVar;
  }

  const resolved = resolveEventNode(ctx.nodes, options);
  const nodes = resolved.node ?? ctx.nodes;

  return callback({ ctx, nodes, warn });
}
