import { CSPineUtil } from "@/CSPine";
import { AlpineComponent } from "alpinejs";
import { classToggle } from "./classToggle";
import { getAlpineInstance } from "@/utils/getAlpineInstance";

export interface UiUtils {
  classToggle(alpine: AlpineComponent<any>): string;
}

export function ui($el: HTMLElement): CSPineUtil<UiUtils> {
  return {
    classToggle(alpine) {
      return classToggle($el, getAlpineInstance(this, alpine));
    },

    $config: {
      name: "ui",
    },
  };
}
