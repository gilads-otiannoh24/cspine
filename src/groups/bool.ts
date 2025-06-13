import { accessVariable } from "@src/utils/accessVariable";
import { useContext } from "@src/utils/useContext";
import { AlpineComponent } from "alpinejs";

export interface BooleanUtils {
  toggle(alpine?: AlpineComponent<any>): void;
  isTrue(alpine?: AlpineComponent<any>): boolean;
  isFalse(alpine?: AlpineComponent<any>): boolean;
}

export function bool($el: HTMLElement): BooleanUtils {
  return {
    toggle(alpine) {
      const ctx = useContext(this, alpine, "toggle", "var", true);

      const cp = ctx.cp;

      const varName = ctx.varName;
      const variable = accessVariable(cp, varName);

      if (typeof variable === "boolean") {
        accessVariable(cp, varName, "set", !variable);
      } else {
        console.warn(
          "CSPUtils::bool.toggle - Variable cannot be toggled as it is not a boolean",
          $el
        );
      }
    },

    isTrue(alpine) {
      const ctx = useContext(this, alpine, "isTrue", "var", true);

      const cp = ctx.cp;

      const varName = ctx.varName;
      const variable = accessVariable(cp, varName);

      if (typeof variable === "boolean") {
        return variable === true;
      } else {
        console.warn(
          "CSPUtils::bool.isTrue - Variable cannot be toggled as it is not a boolean",
          $el
        );
      }

      return false;
    },

    isFalse(alpine) {
      const ctx = useContext(this, alpine, "isFalse", "var", true);

      const cp = ctx.cp;

      const varName = ctx.varName;
      const variable = accessVariable(cp, varName);

      if (typeof variable === "boolean") {
        return variable === false;
      } else {
        console.warn(
          "CSPUtils::bool.isFalse - Variable cannot be toggled as it is not a boolean",
          $el
        );
      }

      return false;
    },
  };
}
