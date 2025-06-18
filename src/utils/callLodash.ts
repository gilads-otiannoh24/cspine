import _ from "lodash";

export function callLodash(fnName: string, args?: string[]) {
  if ((_ as any)[fnName]) {
    return (_ as any)[fnName](...(args || []));
  }

  console.warn("CSPine - Lodash function not found:", fnName);
  return false;
}
