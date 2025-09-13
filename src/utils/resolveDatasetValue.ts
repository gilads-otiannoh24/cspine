import { parseNamespaced } from "./parseNamespaced";
import { parseMultiMapping } from "./parseMultiMapping";
import { castValue } from "./castValue";
import { Options } from "@/CSPine";
import { parse } from "@/v2/dsl/parse";
import { ASTNode, NormalNode } from "@/v2/dsl/types";
import { validateASTNode } from "./inputValidator";

type Dataset = DOMStringMap;

export function resolveDatasetValue(
  datasets: Dataset,
  fnName: string,
  targetKey: string,
  options?: Partial<Options>
): any {
  const raw = datasets[targetKey] || "";
  const castsRaw = datasets.cast || "";
  const computedRaw = datasets.computed || "";
  const multiCasts = parseMultiMapping(castsRaw, options);
  const multiComputed = parseMultiMapping(computedRaw, options);

  const computed = multiComputed[targetKey] || {};
  const values = parseNamespaced(raw, options);
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
  el: HTMLElement,
  fn: { fn: string; group: string }
): ASTNode[] {
  const input = el.dataset.cspine;

  if (input === undefined) {
    console.warn("CSPine: cspine dataset is undefined\n", el);
    return [];
  }

  let fnName = fn.fn;
  let group = fn.group;

  const ast = parse(input);

  const nodes = ast.filter((s) => {
    if (fnName === "call" && group === "util") {
      return s.type === "call";
    }

    const namedGroup = (s as NormalNode).commandArgs?.named?.group;
    const n = s as NormalNode;

    return namedGroup
      ? namedGroup.value === group && n.command === fnName
      : n.command === fnName;
  });

  return nodes;
}
