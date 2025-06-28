import { Config, CSPineUtil } from "@/CSPine";
import { useContext } from "@/utils/useContext";
import { AlpineComponent, MagicUtilities } from "alpinejs";

export interface LogicUtils {
  if(alpine: AlpineComponent<any>): void;
  unless(unless: AlpineComponent<any>): void;
}

export function logic(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<LogicUtils> {
  return {
    if() {
      const ctx = useContext($el, "if", "cond", true);
      const result = !!ctx.varName;
      return !result;
    },

    unless() {
      const ctx = useContext($el, "unless", "cond", true);
      const result = !!ctx.varName;
      return result;
    },

    $config: {
      name: "logic",
    },
  };
}
