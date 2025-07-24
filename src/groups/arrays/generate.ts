import { Options } from "@/CSPine";
import { withContextParsed } from "@/utils/withContext";

export function generate(el: HTMLElement, options: Options) {
  return withContextParsed(el, "generate", "array", options, fn, false);
}

const fn: Parameters<typeof withContextParsed>[4] = ({ parsedNodes }) => {
  const parsed = parsedNodes[0];
  if (!parsed) return [];

  const { start = { value: 0 }, step = { value: 1 } } =
    parsed.commandArgs.named;

  return Array.from({ length }, (_, i) => start.value + i * step.value);
};
