import { Options } from "@/CSPine";
import { withContextParsed } from "@/utils/withContext";

export function or(el: HTMLElement, options: Options) {
  return withContextParsed(el, "or", "state", options, orFn, false);
}

const orFn: Parameters<typeof withContextParsed>[4] = ({
  parsedNodes,
  options,
}) => {
  const parsed = parsedNodes[0];
  if (!parsed) return "";

  return options.evaluate(parsed?.reference as string) || parsed.target?.value;
};
