import { Options } from "@/CSPine";
import { withContextParsed } from "@/utils/withContext";

export function notDefined(el: HTMLElement, options: Options) {
  return withContextParsed(el, "notDefined", "state", options, fn, false);
}

const fn: Parameters<typeof withContextParsed>[4] = ({
  parsedNodes,
  options,
}) => {
  const { evaluate } = options;
  const parsed = parsedNodes[0];
  if (!parsed) return false;
  const ref = evaluate(parsed.reference as string);

  return ref === undefined || ref === null;
};
