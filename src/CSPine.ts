import Alpine, {
  Alpine as AlpineGlobal,
  InferInterceptors,
  MagicUtilities,
} from "alpinejs";
import { resolveData } from "./utils/resolveDatasetValue";
import { resolveCSPineGroups } from "./utils/resolveCSPineGroups";

export interface CSPineUtils {
  [key: string]: CSPineUtil<any>;
}

export type MagicUtilitiesWithContext = Alpine.MagicUtilities & {
  this: ThisType<any>;
};

export type CSPineGroup = (
  el: HTMLElement,
  options: MagicUtilities,
  config: Config
) => CSPineUtil<any>;

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

export type Config = CSPine["config"];

export interface CSPine {
  config: {
    groups?: CSPineGroup[];
    useV2Parsing: boolean;
  };
  plugin(Alpine: AlpineGlobal): void;
}

const CSPine: CSPine = {
  config: {
    groups: [],
    useV2Parsing: false,
  },

  plugin(Alpine: AlpineGlobal) {
    Alpine.magic(
      "_",
      (
        $el,
        { evaluate, evaluateLater, effect, cleanup, Alpine, interceptor }
      ) =>
        resolveCSPineGroups(
          $el,
          CSPine.config.groups || [],
          {
            Alpine,
            evaluate,
            evaluateLater,
            effect,
            cleanup,
            interceptor,
          },
          CSPine.config
        )
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
