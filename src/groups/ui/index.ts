import { Config, CSPineUtil } from "@/CSPine";
import { AlpineComponent, MagicUtilities } from "alpinejs";
import { classToggle } from "./classToggle";
import { getAlpineInstance } from "@/utils/getAlpineInstance";

export interface UiUtils {
  classToggle(alpine: AlpineComponent<any>): string;
}

export function ui(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<UiUtils> {
  return {
    classToggle(alpine) {
      return classToggle($el, { ...options, this: this });
    },

    $config: {
      name: "ui",
    },
  };
}
