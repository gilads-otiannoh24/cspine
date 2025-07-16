import { Config, CSPineUtil } from "@/CSPine";
import { MagicUtilities } from "alpinejs";
import { update } from "./update";
import { reset } from "./reset";

export interface FormUtils {
  update(e?: Event): void;
  reset(e?: Event): void;
}

export function form(
  el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<FormUtils> {
  return {
    update(e) {
      update(el, { ...options, this: this, config, e });
    },
    reset(e) {
      reset(el, { ...options, this: this, config, e });
    },
    $config: {
      name: "array",
    },
  };
}
