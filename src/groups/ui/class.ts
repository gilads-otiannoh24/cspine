import { Options } from "@/CSPine";
import { castValue } from "@/utils/castValue";
import { RESERVED_ARG_KEYWORDS } from "@/utils/constants";
import { warnEmptyNode } from "@/utils/issueWarning";
import { useContext } from "@/utils/useContext";

export function classes(el: HTMLElement, options: Options): string {
  const ctx = useContext(el, "class", options, true);

  const node = ctx.parsed;

  if (!node) {
    warnEmptyNode(ctx.fn, "ui", el);
    return "";
  }

  let variable = options.evaluate(node.reference as string);

  const cast = node.commandArgs.named.cast;
  const defaultClass = node.commandArgs.named.default;
  const classStr = node.commandArgs.named[variable as any];

  let escaped = false;
  if (RESERVED_ARG_KEYWORDS.includes(variable as string)) escaped = true;

  if (cast && !cast.escaped) {
    variable = castValue(variable, cast.value);
  }

  if (typeof classStr?.value !== "string") return defaultClass?.value || "";

  return escaped && classStr.escaped
    ? classStr?.escapedValue || ""
    : classStr?.value || "";
}
