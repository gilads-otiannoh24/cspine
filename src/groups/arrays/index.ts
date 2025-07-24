import { Config, CSPineUtil } from "@/CSPine";
import { MagicUtilities } from "alpinejs";
import { filter } from "./filter";
import { generate } from "./generate";

export interface ArrayUtils {
  filter(e?: Event): any[];
  generate(e?: Event): any[];
}

export function array(
  el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<ArrayUtils> {
  return {
    filter(e) {
      return filter(el, { ...options, config, e, this: this });
    },

    generate(e) {
      return generate(el, { ...options, config, e, this: this });
    },

    $config: {
      name: "array",
    },
  };
}
