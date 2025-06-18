import { getAlpineInstance } from "@/utils/getAlpineInstance";
import { AlpineComponent } from "alpinejs";
import { set } from "./set";
import { CSPineUtil } from "@/CSPine";
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

export default function state($el: HTMLElement): CSPineUtil<StateUtils> {
  return {
    set(alpine) {
      set($el, getAlpineInstance(this, alpine));
    },

    inc(alpine) {
      inc($el, getAlpineInstance(this, alpine));
    },

    dec(alpine) {
      dec($el, getAlpineInstance(this, alpine));
    },

    empty(alpine) {
      return empty($el, getAlpineInstance(this, alpine));
    },

    reset(alpine) {
      reset($el, getAlpineInstance(this, alpine));
    },

    not(alpine) {
      return not($el, getAlpineInstance(this, alpine));
    },

    type(alpine) {
      return type($el, getAlpineInstance(this, alpine));
    },

    equals(alpine) {
      return equals($el, getAlpineInstance(this, alpine));
    },

    notEquals(alpine) {
      return notEquals($el, getAlpineInstance(this, alpine));
    },

    greaterThan(alpine) {
      return greaterThan($el, getAlpineInstance(this, alpine));
    },

    lessThan(alpine) {
      return lessThan($el, getAlpineInstance(this, alpine));
    },

    greaterThanOrEqual(alpine) {
      return greaterThanOrEqual($el, getAlpineInstance(this, alpine));
    },

    lessThanOrEqual(alpine) {
      return lessThanOrEqual($el, getAlpineInstance(this, alpine));
    },

    $config: {
      name: "state",
    },
  };
}
