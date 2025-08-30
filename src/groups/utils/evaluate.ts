import { Options } from "@/CSPine";
import { withContextParsed } from "@/utils/withContext";

export function evaluate(el: HTMLElement, options: Options) {
  return withContextParsed(el, "generate", "array", options, fn, false);
}

const fn: Parameters<typeof withContextParsed>[4] = ({ parsedNodes, options }) => {
  const parsed = parsedNodes[0];
  if (!parsed) return null;

    const [defaultValue] = parsed.commandArgs.positional;

  return options.evaluate(parsed.reference as string) ?? defaultValue;
};
