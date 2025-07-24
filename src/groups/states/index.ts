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
import { ifFn } from "./if";
import { or } from "./or";
import { coalesce } from "./coalesce";
import { and } from "./and";
import { defined } from "./defined";
import { notDefined } from "./notDefined";
import { nor } from "./nor";

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
  if(e?: Event): any;
  or(e?: Event): any;
  and(e?: Event): boolean;
  coalesce(e?: Event): any;
  defined(e?: Event): any;
  notDefined(e?: Event): any;
  nor(e?: Event): any;
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
    if(e) {
      return ifFn($el, { ...options, this: this, e, config });
    },
    or(e) {
      return or($el, { ...options, this: this, e, config });
    },
    coalesce(e) {
      return coalesce($el, { ...options, this: this, e, config });
    },
    and(e) {
      return and($el, { ...options, this: this, e, config });
    },
    defined(e) {
      return defined($el, { ...options, this: this, e, config });
    },
    notDefined(e) {
      return notDefined($el, { ...options, this: this, e, config });
    },
    nor(e) {
      return nor($el, { ...options, this: this, e, config });
    },

    $config: {
      name: "state",
    },
  };
}
