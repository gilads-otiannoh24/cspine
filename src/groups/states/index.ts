import { getAlpineInstance } from "@/utils/getAlpineInstance";
import Alpine, { AlpineComponent } from "alpinejs";
import { set } from "./set";
import { Config, CSPineUtil } from "@/CSPine";
import { inc } from "./inc";
import { dec } from "./dec";
import { empty } from "./empty";
import { reset } from "./reset";
import { not } from "./not";
import { type } from "./type";
import { equals } from "./equals";
import { notEquals } from "./notEquals";
import { greaterThan } from "./greaterThan";
import { lessThan } from "./lessThan";
import { greaterThanOrEqual } from "./greaterThanOrEqul";
import { lessThanOrEqual } from "./lessThanOrEqual";

export interface StateUtils {
  set(alpine?: AlpineComponent<any>): void;
  inc(alpine?: AlpineComponent<any>): void;
  dec(alpine?: AlpineComponent<any>): void;
  empty(alpine?: AlpineComponent<any>): boolean;
  reset(alpine?: AlpineComponent<any>): void;
  not(alpine?: AlpineComponent<any>): boolean;
  type(alpine?: AlpineComponent<any>): boolean;
  equals(alpine?: AlpineComponent<any>): boolean;
  notEquals(alpine?: AlpineComponent<any>): boolean;
  greaterThan(alpine?: AlpineComponent<any>): boolean;
  lessThan(alpine?: AlpineComponent<any>): boolean;
  greaterThanOrEqual(alpine?: AlpineComponent<any>): boolean;
  lessThanOrEqual(alpine?: AlpineComponent<any>): boolean;
}

export function state(
  $el: HTMLElement,
  options: Alpine.MagicUtilities,
  config: Config
): CSPineUtil<StateUtils> {
  return {
    set(alpine) {
      set($el, { ...options, this: this });
    },

    inc(alpine) {
      inc($el, { ...options, this: this });
    },

    dec(alpine) {
      dec($el, { ...options, this: this });
    },

    empty(alpine) {
      return empty($el, { ...options, this: this });
    },

    reset(alpine) {
      reset($el, { ...options, this: this });
    },

    not(alpine) {
      return not($el, { ...options, this: this });
    },

    type(alpine) {
      return type($el, { ...options, this: this });
    },

    equals(alpine) {
      return equals($el, { ...options, this: this });
    },

    notEquals(alpine) {
      return notEquals($el, { ...options, this: this });
    },

    greaterThan(alpine) {
      return greaterThan($el, { ...options, this: this });
    },

    lessThan(alpine) {
      return lessThan($el, { ...options, this: this });
    },

    greaterThanOrEqual(alpine) {
      return greaterThanOrEqual($el, { ...options, this: this });
    },

    lessThanOrEqual(alpine) {
      return lessThanOrEqual($el, { ...options, this: this });
    },

    $config: {
      name: "state",
    },
  };
}
