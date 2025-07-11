import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function log(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "log", group: "util" }, options, true);
  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, ctx.group, el);
    return;
  }

  const later = options.evaluateLater(node.reference as string);

  options.effect(() => {
    later((ref) => {
      console.log(ref);
    });
  });

  node.commandArgs.positional.forEach((ref) => {
    const later = options.evaluateLater(ref);

    options.effect(() => {
      later((v) => {
        console.log(v);
      });
    });
  });
}
