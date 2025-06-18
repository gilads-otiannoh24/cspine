import { CSPineUtil } from "@/CSPine";
import { accessVariable } from "@/utils/accessVariable";
import { callLodash } from "@/utils/callLodash";
import { handleOperators } from "@/utils/handleOperators";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export interface Utils {
  switch(alpine: AlpineComponent<any>): void;
  bindTo(alpine: AlpineComponent<any>): void;
  call(alpine: AlpineComponent<any>): any;
  callCSPine(alpine: AlpineComponent<any>): any;
}

export function util($el: HTMLElement): CSPineUtil<Utils> {
  return {
    call(alpine) {
      const ctx = useContext(this, alpine, "call", "call", true);
      const cp = ctx.cp;

      const fnNames = (ctx.varName as string).split("->");
      const type = resolveData(ctx.dataset, ctx.fn, "type", true);

      const results: any[] = [];
      fnNames.forEach((fnWithArgs) => {
        const fnName = fnWithArgs.split("~")[0] || "";
        const args = fnWithArgs.split("~")[1]?.split(",") || ([] as string[]);

        if (type && type === "lodash") {
          results.push(callLodash(fnName, args));
        }

        const fn = accessVariable(cp, fnName);

        if (typeof fn === "function") {
          results.push(fn(...args));
        } else {
          console.warn(`CSPUtils::call - ${fnName} is not a function`, this);
        }
      });
    },

    callCSPine(alpine) {
      const ctx = useContext(this, alpine, "callCSPine", "call", true);

      const cp = ctx.cp;

      const fnNames = (ctx.varName as string) || "";

      const results: any[] = [];
      fnNames.split(",").forEach((fnName) => {
        const fn = accessVariable(cp, fnName);
        if (typeof fn === "function") {
          results.push(fn(cp));
        } else {
          results.push(fn);
        }
      });

      return handleOperators($el, results);
    },

    switch(alpine) {
      const ctx = useContext(this, alpine, "switch", "switch", true);
      const cp = ctx.cp;
      const switchVal = accessVariable(cp, ctx.varName);

      $el.querySelectorAll("template[data-case]").forEach((tpl) => {
        const val = tpl.getAttribute("data-case");

        tpl.replaceWith(
          val === switchVal
            ? (tpl as HTMLTemplateElement).content.cloneNode(true)
            : document.createComment("case skipped")
        );
      });
    },

    bindTo(alpine) {
      const ctx = useContext(this, alpine, "bindTo", "bindTo", true);
      const cp = ctx.cp;
      const expr = ctx.varName; // e.g., "total=price * qty"

      try {
        const [target, expression] = expr
          .split("=")
          .map((x: string) => x.trim());
        const fn = new Function("with(this) { return " + expression + " }");
        accessVariable(cp, target, "set", fn.call(cp));
      } catch (err) {
        console.warn(
          `CSPUtils::bindTo - Failed to evaluate expression: ${expr}`,
          this,
          err
        );
      }
    },
    $config: {
      name: "util",
    },
  };
}
