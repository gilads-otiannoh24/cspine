import { CSPineUtil } from "@/CSPine";
import { AlpineComponent } from "alpinejs";
import { toggle } from "./toggle";
import { getAlpineInstance } from "@/utils/getAlpineInstance";
import { isTrue } from "./isTrue";
import { isFalse } from "./isFalse";

export interface BooleanUtils {
  toggle(alpine?: AlpineComponent<any>): void;
  isTrue(alpine?: AlpineComponent<any>): boolean;
  isFalse(alpine?: AlpineComponent<any>): boolean;
}

export function bool($el: HTMLElement): CSPineUtil<BooleanUtils> {
  return {
    toggle(alpine) {
      toggle($el, getAlpineInstance(this, alpine));
    },

    isTrue(alpine) {
      return isTrue($el, getAlpineInstance(this, alpine));
    },

    isFalse(alpine) {
      return isFalse($el, getAlpineInstance(this, alpine));
    },

    $config: {
      name: "bool",
    },
  };
}
