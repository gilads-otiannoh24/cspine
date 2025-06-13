import { parseNamespaced } from "./parseNamespaced";
import { parseMultiMapping } from "./parseMultiMapping";
import { castValue } from "./castValue";

type Dataset = DOMStringMap;

export function resolveDatasetValue(
  datasets: Dataset,
  fnName: string,
  targetKey: string
): any {
  const raw = datasets[targetKey] || "";
  const castsRaw = datasets.cast || "";
  const multiCasts = parseMultiMapping(castsRaw);

  const values = parseNamespaced(raw);
  const casts = multiCasts[targetKey] || {};

  const value = values[fnName] ?? values["default"];
  let castType = casts[fnName] ?? casts["default"];

  if (Array.isArray(value) && value.length > 0) {
    return value.map((v, index) => {
      if (castType && castType[index] !== undefined) {
        return castValue(v, castType[index]);
      }

      return v;
    });
  }

  castType = casts[fnName] ?? undefined;

  return castType ? castValue(value as string, castType as string) : value;
}

export function resolveData(
  datasets: Dataset,
  fnName: string,
  targetKey: string,
  singleRecord?: boolean
) {
  let varName =
    resolveDatasetValue(datasets, fnName, targetKey) ||
    resolveDatasetValue(datasets, "default", targetKey);

  if (singleRecord !== undefined && singleRecord) {
    if (Array.isArray(varName) && varName.length > 0) {
      varName = varName[0];
    } else if (Array.isArray(varName) && varName.length === 0) {
      throw new Error(fnName + ": Variable is not set");
    }
  }

  return varName;
}
