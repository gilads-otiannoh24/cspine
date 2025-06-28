import { MagicUtilitiesWithContext } from "@/CSPine";
import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";

export function reset(el: HTMLElement, options: MagicUtilitiesWithContext) {
  const ctx = useContext(el, "reset", "var", true);

  const cp = options.this;

  let varName = ctx.varName;

  const variable = accessVariable(cp, varName);

  if (typeof variable === "string") accessVariable(cp, varName, "set", "");
  else if (Array.isArray(variable)) accessVariable(cp, varName, "set", []);
  else if (typeof variable === "object") accessVariable(cp, varName, "set", {});
  else accessVariable(cp, varName, "set", null);
}
