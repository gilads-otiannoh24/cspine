import { Options } from "@/CSPine";
import { warnEmptyNode } from "@/utils/issueWarning";
import { track } from "@/utils/tracking";
import { useContext } from "@/utils/useContext";

export function log(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "log", group: "util" }, options, true);
  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, ctx.group, el);
    return;
  }

  const later = options.evaluateLater(node.reference as string);

  if (track(el, ctx.group, ctx.fn)) {
    options.effect(() => {
      later((ref) => {
        console.log(ref);
      });
    });
  }

  node.commandArgs.positional.forEach((ref) => {
    const later = options.evaluateLater(ref);
    if (track(el, ctx.group, ctx.fn)) {
      options.effect(() => {
        later((v) => {
          console.log(v);
        });
      });
    }
  });
}
