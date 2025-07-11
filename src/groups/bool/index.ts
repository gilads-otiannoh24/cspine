import { Config, CSPineUtil } from "@/CSPine";
import { toggle } from "./toggle";
import { truthy } from "./truthy";
import { falsy } from "./falsy";
import { MagicUtilities } from "alpinejs";

export interface BooleanUtils {
  toggle(e?: Event): void;
  truthy(e?: Event): boolean;
  falsy(e?: Event): boolean;
}

export function bool(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<BooleanUtils> {
  return {
    toggle(e) {
      toggle($el, { ...options, this: this, e, config });
    },

    truthy(e) {
      return truthy($el, { ...options, this: this, e, config });
    },

    falsy(e) {
      return falsy($el, { ...options, this: this, e, config });
    },

    $config: {
      name: "bool",
    },
  };
}
