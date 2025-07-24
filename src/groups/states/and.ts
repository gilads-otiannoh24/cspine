import { Options } from "@/CSPine";
import { withContextParsed } from "@/utils/withContext";

export function and(el: HTMLElement, options: Options): boolean {
  return withContextParsed(el, "and", "state", options, andFn, false);
}

const andFn: Parameters<typeof withContextParsed>[4] = ({
  parsedNodes,
  options,
}): boolean => {
  const parsed = parsedNodes[0];
  if (!parsed) return false;

  return options.evaluate(parsed?.reference as string) && parsed.target?.value;
};
