import { Options } from "@/CSPine";
import { BinaryOperator, resolveOperator } from "@/utils/resolveOperator";
import { withContextParsed } from "@/utils/withContext";

export function ifFn(el: HTMLElement, options: Options) {
  return withContextParsed(el, "if", "state", options, fn, false);
}

const fn: Parameters<typeof withContextParsed>[4] = ({
  parsedNodes,
  options,
}) => {
  const parsed = parsedNodes[0];
  if (!parsed) return "";

  const { evaluate } = options;
  const { operator } = parsed.commandArgs.named;
  const [val1 = "", val2 = ""] = parsed.commandArgs.positional;

  const ref = evaluate(parsed.reference as string);

  const op = parsed.target?.value
    ? operator && operator.value
      ? operator.value
      : "==="
    : null;

  const check = op
    ? resolveOperator(op as BinaryOperator, ref, parsed.target?.value)
    : ref;

  return check ? val1 : val2;
};
