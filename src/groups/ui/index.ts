import { Config, CSPineUtil } from "@/CSPine";
import { MagicUtilities } from "alpinejs";
import { classToggle } from "./classToggle";
import { classes } from "./class";

export interface UiUtils {
  classToggle(e: Event): string;
  class(e: Event): string;
}

export function ui(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<UiUtils> {
  return {
    classToggle(e) {
      return classToggle($el, { ...options, this: this, e, config });
    },

    class(e) {
      return classes($el, { ...options, this: this, e, config });
    },

    $config: {
      name: "ui",
    },
  };
}
