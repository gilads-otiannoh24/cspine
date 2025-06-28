import { MagicUtilitiesWithContext } from "@/CSPine";
import { useContext } from "@/utils/useContext";

export function switchFn(
  el: HTMLElement,
  options: MagicUtilitiesWithContext
): void {
  const ctx = useContext(el, "switch", "switch", true);
  const switchVal = options.evaluate(ctx.varName);

  el.querySelectorAll("template[data-case]").forEach((tpl) => {
    const val = tpl.getAttribute("data-case");

    tpl.replaceWith(
      val === switchVal
        ? (tpl as HTMLTemplateElement).content.cloneNode(true)
        : document.createComment("case skipped")
    );
  });
}
