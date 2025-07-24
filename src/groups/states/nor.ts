import { Options } from "@/CSPine";
import { withContextParsed } from "@/utils/withContext";

export function nor(el: HTMLElement, options: Options) {
  return withContextParsed(el, "nor", "state", options, norFn, false);
}

const norFn: Parameters<typeof withContextParsed>[4] = ({
  parsedNodes,
  options,
}) => {
  if (!parsedNodes[0]) return null;

  const parsed = parsedNodes[0];

  const refValue = options.evaluate(parsed.reference as string);
  if (refValue) return false;
  if (parsed.target?.value) return false;

  return true;
};
