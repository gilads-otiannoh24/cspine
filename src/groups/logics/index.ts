import { CSPineUtil } from "@/CSPine";
import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export interface LogicUtils {
  if(alpine: AlpineComponent<any>): void;
  unless(unless: AlpineComponent<any>): void;
}

export function logic($el: HTMLElement): CSPineUtil<LogicUtils> {
  return {
    if(alpine) {
      const ctx = useContext(this, alpine, "if", "cond", true);
      const result = !!ctx.varName;
      return !result;
    },

    unless(alpine) {
      const ctx = useContext(this, alpine, "unless", "cond", true);
      const result = !!ctx.varName;
      return result;
    },

    $config: {
      name: "logic",
    },
  };
}
