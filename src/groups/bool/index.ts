import { CSPineUtil } from "@/CSPine";
import { AlpineComponent } from "alpinejs";
import { toggle } from "./toggle";
import { getAlpineInstance } from "@/utils/getAlpineInstance";
import { truthy } from "./truthy";
import { falsy } from "./falsy";

export interface BooleanUtils {
  toggle(alpine?: AlpineComponent<any>): void;
  truthy(alpine?: AlpineComponent<any>): boolean;
  falsy(alpine?: AlpineComponent<any>): boolean;
}

export function bool($el: HTMLElement): CSPineUtil<BooleanUtils> {
  return {
    toggle(alpine) {
      toggle($el, getAlpineInstance(this, alpine));
    },

    truthy(alpine) {
      return truthy($el, getAlpineInstance(this, alpine));
    },

    falsy(alpine) {
      return falsy($el, getAlpineInstance(this, alpine));
    },

    $config: {
      name: "bool",
    },
  };
}
