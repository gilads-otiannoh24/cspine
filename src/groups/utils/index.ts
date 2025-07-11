import { Config, CSPineUtil } from "@/CSPine";
import { AlpineComponent, MagicUtilities } from "alpinejs";
import { log } from "./log";
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
      return call($el, { ...options, this: this, config });
    },

    switch() {
      switchFn($el, { ...options, this: this, config });
    },

    bindTo() {
      bindTo($el, { ...options, this: this, config });
    },

    log() {
      return log($el, { ...options, this: this, config });
    },

    $config: {
      name: "util",
    },
  };
}
