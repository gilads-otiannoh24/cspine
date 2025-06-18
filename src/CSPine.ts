import {
  AlpineComponent,
  Alpine as AlpineGlobal,
  InferInterceptors,
  plugin,
} from "alpinejs";
import { resolveData } from "./utils/resolveDatasetValue";
import { resolveCSPineGroups } from "./utils/resolveCSPineGroups";

export interface CSPineUtils {
  [key: string]: CSPineUtil<any>;
}

export type CSPineGroup = (el: HTMLElement) => CSPineUtil<any>;

export interface Data {
  True: true;
  False: false;
  doNothing: () => void;
}

export type CSPineUtil<T> = T & {
  $config: {
    name: string;
  };
};

export interface CSPine {
  config: {
    functions?: string[];
    groups?: CSPineGroup[];
  };
  plugin(Alpine: AlpineGlobal): void;
}

const CSPine: CSPine = {
  config: {
    functions: [],
    groups: [],
  },

  plugin(Alpine: AlpineGlobal) {
    Alpine.magic("_", ($el): any =>
      resolveCSPineGroups($el, CSPine.config.groups || [])
    );

    Alpine.directive(
      "switch",
      ($el, { expression }, { evaluateLater, effect }) => {
        const switchItem = evaluateLater(expression);

        effect(() => {
          switchItem((item) => {
            $el.querySelectorAll("[data-case]").forEach((tpl) => {
              let val = tpl.getAttribute("data-case") || "";
              const cast =
                $el.dataset.cast || tpl.getAttribute("data-cast") || "";

              val = resolveData({ case: val, cast }, "switch", "case", true);
              (tpl as any).style.display =
                item === val ? "inline-block" : "none";

              console.log(val);
            });
          });
        });
      }
    );
  },
};

export const data: InferInterceptors<Data> = {
  True: true,
  False: false,
  doNothing: () => void 0,
};

export function registerCSPineData(Alpine: AlpineGlobal): AlpineGlobal {
  Alpine.data("Empty", () => ({}));

  return Alpine;
}

export default CSPine;
