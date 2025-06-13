import { accessVariable } from "@src/utils/accessVariable";
import { resolveData } from "@src/utils/resolveDatasetValue";
import { useContext } from "@src/utils/useContext";
import { AlpineComponent } from "alpinejs";

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

export function states($el: HTMLElement): StateUtils {
  return {
    set(alpine) {
      const ctx = useContext(this, alpine, "set");

      const cp = ctx.cp;

      const varName = ctx.varName;
      const value = resolveData(ctx.dataset, ctx.fn, "value");

      if (Array.isArray(varName)) {
        varName.forEach((v: string, index: number) => {
          if (value[index] !== undefined) {
            accessVariable(cp, v, "set", value[index]);
          }
        });
      } else {
        accessVariable(cp, varName, "set", value);
      }
    },

    inc(alpine) {
      const ctx = useContext(this, alpine, "inc", "var", true);

      const cp = ctx.cp;
      const varName = ctx.varName;
      let variable = accessVariable(cp, varName);

      if (typeof variable === "number") {
        accessVariable(cp, varName, "set", ++variable);
      } else {
        console.warn(
          "CSPUtils::inc - Variable cannot be incremented as it is not a number",
          $el
        );
      }
    },

    dec(alpine) {
      const ctx = useContext(this, alpine, "dec", "var", true);

      const cp = ctx.cp;

      const varName = ctx.varName;
      let variable = accessVariable(cp, varName);

      if (typeof variable === "number") {
        accessVariable(cp, varName, "set", --variable);
      } else {
        console.warn(
          "CSPUtils::state.dec - Variable cannot be incremented as it is not a number",
          $el
        );
      }
    },

    empty(alpine) {
      const ctx = useContext(this, alpine, "empty", "var", true);

      const varName = ctx.varName;
      const variable = accessVariable(ctx.cp, varName);

      if (typeof variable === "string") return variable === "";
      else if (typeof variable === "object")
        return Object.keys(variable).length === 0;
      else if (Array.isArray(variable)) return variable.length === 0;
      else return false;
    },

    reset(alpine) {
      const ctx = useContext(this, alpine, "reset", "var", true);

      const cp = ctx.cp;

      let varName = ctx.varName;

      const variable = accessVariable(cp, varName);

      if (typeof variable === "string") accessVariable(cp, varName, "set", "");
      else if (Array.isArray(variable)) accessVariable(cp, varName, "set", []);
      else if (typeof variable === "object")
        accessVariable(cp, varName, "set", {});
      else accessVariable(cp, varName, "set", null);
    },

    not(alpine) {
      const ctx = useContext(this, alpine, "negate", "var", true);

      const cp = ctx.cp;

      const varName = ctx.varName;
      const variable = accessVariable(cp, varName);

      return !variable;
    },

    type(alpine) {
      const ctx = useContext(this, alpine, "negate", "var", true);

      const cp = ctx.cp;

      const varName = ctx.varName;
      const variable = accessVariable(cp, varName);

      const type = resolveData(ctx.dataset, ctx.fn, "type", true);

      if (type === "array") return Array.isArray(variable);
      if (type === "null") return variable === null;
      if (type === "undefined") return variable === undefined;

      return typeof variable === type;
    },

    equals(alpine) {
      const ctx = useContext(this, alpine, "equals", "var", true);

      const variable = accessVariable(ctx.cp, ctx.varName);
      const value = resolveData(ctx.dataset, ctx.fn, "equals", true);

      if (variable === undefined || value === undefined) {
        return false;
      }

      return value === variable;
    },

    notEquals(alpine) {
      const ctx = useContext(this, alpine, "notEquals", "var", true);

      const variable = accessVariable(ctx.cp, ctx.varName);
      const value = resolveData(ctx.dataset, ctx.fn, "equals", true);

      if (variable === undefined || value === undefined) {
        return false;
      }

      return value !== variable;
    },

    greaterThan(alpine) {
      const ctx = useContext(this, alpine, "greaterThan", "var", true);

      const variable = accessVariable(ctx.cp, ctx.varName);
      const value = resolveData(ctx.dataset, ctx.fn, "equals", true);

      if (variable === undefined || value === undefined) {
        return false;
      }

      return variable > value;
    },

    lessThan(alpine) {
      const ctx = useContext(this, alpine, "greaterThan", "var", true);

      const variable = accessVariable(ctx.cp, ctx.varName);
      const value = resolveData(ctx.dataset, ctx.fn, "equals", true);

      if (variable === undefined || value === undefined) {
        return false;
      }

      return variable < value;
    },

    greaterThanOrEqual(alpine) {
      const ctx = useContext(this, alpine, "greaterThan", "var", true);

      const variable = accessVariable(ctx.cp, ctx.varName);
      const value = resolveData(ctx.dataset, ctx.fn, "equals", true);

      if (variable === undefined || value === undefined) {
        return false;
      }

      return variable >= value;
    },

    lessThanOrEqual(alpine) {
      const ctx = useContext(this, alpine, "greaterThan", "var", true);

      const variable = accessVariable(ctx.cp, ctx.varName);
      const value = resolveData(ctx.dataset, ctx.fn, "equals", true);

      if (variable === undefined || value === undefined) {
        return false;
      }

      return variable <= value;
    },
  };
}
