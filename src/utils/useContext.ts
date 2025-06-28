import { AlpineComponent } from "alpinejs";
import { getAlpineInstance } from "./getAlpineInstance";
import { resolveData } from "./resolveDatasetValue";

export function useContext(
  el: HTMLElement,
  fn: string,
  datasetKey: string = "var",
  singleRecord?: boolean
) {
  const dataset = el.dataset;
  let varName = resolveData(dataset, fn, datasetKey);

  if (singleRecord !== undefined && singleRecord) {
    if (Array.isArray(varName) && varName.length > 0) {
      varName = varName[0];
    } else if (Array.isArray(varName) && varName.length === 0) {
      throw new Error(fn + ": Variable is not set");
    }
  }

  return { varName, dataset, fn };
}
