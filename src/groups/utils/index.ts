import { Config, CSPineUtil } from "@/CSPine";
import { accessVariable } from "@/utils/accessVariable";
import { callLodash } from "@/utils/callLodash";
import { handleOperators } from "@/utils/handleOperators";
import { resolveData } from "@/utils/resolveDatasetValue";
import { useContext } from "@/utils/useContext";
import { AlpineComponent, evaluate, MagicUtilities } from "alpinejs";
import { log } from "./log";
import { getAlpineInstance } from "@/utils/getAlpineInstance";
import { call } from "./call";
import { switchFn } from "./switch";
import { bindTo } from "./bindTo";

export interface Utils {
  switch(alpine: AlpineComponent<any>): void;
  bindTo(alpine: AlpineComponent<any>): void;
  call(): any;
  log(alpine: AlpineComponent<any>): any;
}

export function util(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<Utils> {
  return {
    call() {
      return call($el, { ...options, this: this });
    },

    switch() {
      switchFn($el, { ...options, this: this });
    },

    bindTo() {
      bindTo($el, { ...options, this: this });
    },

    log() {
      return log($el, { ...options, this: this });
    },

    $config: {
      name: "util",
    },
  };
}
