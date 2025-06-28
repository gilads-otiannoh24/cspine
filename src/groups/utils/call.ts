import { MagicUtilitiesWithContext } from "@/CSPine";
import { callLodash } from "@/utils/callLodash";
import { handleOperators } from "@/utils/handleOperators";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";

export function call(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "call", "call", true);

  const fnNames = (ctx.varName as string).split("->");
  const type = resolveData(ctx.dataset, ctx.fn, "type", true);

  const results: any[] = [];
  fnNames.forEach((fnWithArgs) => {
    const fnName = fnWithArgs.split("~")[0] || "";
    const args = fnWithArgs.split("~")[1]?.split(",") || ([] as string[]);

    if (type && type === "lodash") {
      results.push(callLodash(fnName, args));
    }

    results.push(options.evaluate(fnName));
  });

  return handleOperators(el, results);
}
