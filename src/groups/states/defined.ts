import { Options } from "@/CSPine";
import { withContextParsed } from "@/utils/withContext";

export function defined(el: HTMLElement, options: Options) {
  return withContextParsed(el, "defined", "state", options, fn, false);
}

const fn: Parameters<typeof withContextParsed>[4] = ({
  parsedNodes,
  options,
}) => {
  const parsed = parsedNodes[0];
  if (!parsed) return false;
  const ref = options.evaluate(parsed.reference as string);

  return ref !== undefined && ref !== null;
};
