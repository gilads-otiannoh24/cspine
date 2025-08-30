import { Config, CSPineUtil } from "@/CSPine";
import { AlpineComponent, MagicUtilities } from "alpinejs";
import { log } from "./log";
import { call } from "./call";
import { switchFn } from "./switch";
import { bindTo } from "./bindTo";
import { evaluate } from "./evaluate";

export interface Utils {
  switch(): void;
  bindTo(): void;
  call(): any;
  log(): any;
  evaluate(): any;
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

    evaluate() {
      return evaluate($el, { ...options, this: this, config });
    },

    $config: {
      name: "util",
    },
  };
}
