import { Options } from "@/CSPine";
import { withContextParsed } from "@/utils/withContext";

export function coalesce(el: HTMLElement, options: Options) {
  return withContextParsed(el, "coalesce", "state", options, fn, false);
}

const fn: Parameters<typeof withContextParsed>[4] = ({ parsedNodes }) => {
  const parsed = parsedNodes[0];
  if (!parsed) return "";

  return parsed?.reference ?? parsed.target?.value;
};
