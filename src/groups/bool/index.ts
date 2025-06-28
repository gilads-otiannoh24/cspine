import { Config, CSPineUtil, MagicUtilitiesWithContext } from "@/CSPine";
import { AlpineComponent, MagicUtilities } from "alpinejs";
import { toggle } from "./toggle";
import { getAlpineInstance } from "@/utils/getAlpineInstance";
import { truthy } from "./truthy";
import { falsy } from "./falsy";

export interface BooleanUtils {
  toggle(alpine?: AlpineComponent<any>): void;
  truthy(alpine?: AlpineComponent<any>): boolean;
  falsy(alpine?: AlpineComponent<any>): boolean;
}

export function bool(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<BooleanUtils> {
  return {
    toggle(alpine) {
      toggle($el, { ...options, this: this });
    },

    truthy(alpine) {
      return truthy($el, { ...options, this: this });
    },

    falsy(alpine) {
      return falsy($el, { ...options, this: this });
    },

    $config: {
      name: "bool",
    },
  };
}
