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
import { MagicUtilities } from "alpinejs";

export interface StateUtils {
  set(e?: Event): void;
  inc(e?: Event): void;
  dec(e?: Event): void;
  empty(e?: Event): boolean;
  reset(e?: Event): void;
  not(e?: Event): boolean;
  type(e?: Event): boolean;
  equals(e?: Event): boolean;
  notEquals(e?: Event): boolean;
  greaterThan(e?: Event): boolean;
  lessThan(e?: Event): boolean;
  greaterThanOrEqual(e?: Event): boolean;
  lessThanOrEqual(e?: Event): boolean;
}

export function state(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<StateUtils> {
  return {
    set(e) {
      set($el, { ...options, this: this, e, config });
    },

    inc(e) {
      inc($el, { ...options, this: this, e, config });
    },

    dec(e) {
      dec($el, { ...options, this: this, e, config });
    },

    empty(e) {
      return empty($el, { ...options, this: this, e, config });
    },

    reset(e) {
      reset($el, { ...options, this: this, e, config });
    },

    not(e) {
      return not($el, { ...options, this: this, e, config });
    },

    type(e) {
      return type($el, { ...options, this: this, e, config });
    },

    equals(e) {
      return equals($el, { ...options, this: this, e, config });
    },

    notEquals(e) {
      return notEquals($el, { ...options, this: this, e, config });
    },

    greaterThan(e) {
      return greaterThan($el, { ...options, this: this, e, config });
    },

    lessThan(e) {
      return lessThan($el, { ...options, this: this, e, config });
    },

    greaterThanOrEqual(e) {
      return greaterThanOrEqual($el, { ...options, this: this, e, config });
    },

    lessThanOrEqual(e) {
      return lessThanOrEqual($el, { ...options, this: this, e, config });
    },

    $config: {
      name: "state",
    },
  };
}
