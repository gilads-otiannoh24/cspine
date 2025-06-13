import { AlpineComponent } from "alpinejs";
import { getAlpineInstance } from "./getAlpineInstance";
import { resolveData } from "./resolveDatasetValue";

export function useContext(
  ctx: AlpineComponent<any>,
  alp: AlpineComponent<any>,
  fn: string,
  datasetKey: string = "var",
  singleRecord?: boolean
) {
  const cp = getAlpineInstance(ctx, alp);
  const dataset = ctx.$el.dataset;
  let varName = resolveData(dataset, fn, datasetKey);

  if (singleRecord !== undefined && singleRecord) {
    if (Array.isArray(varName) && varName.length > 0) {
      varName = varName[0];
    } else if (Array.isArray(varName) && varName.length === 0) {
      throw new Error(fn + ": Variable is not set");
    }
  }

  return { cp, varName, dataset, fn };
}
