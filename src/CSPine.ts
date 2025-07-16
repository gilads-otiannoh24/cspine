import {
  Alpine as AlpineGlobal,
  InferInterceptors,
  MagicUtilities,
} from "alpinejs";
import { resolveCSPineGroups } from "./utils/resolveCSPineGroups";
import { initializeCSPineScopes } from "./v2/tree/init";

export interface CSPineUtils {
  [key: string]: CSPineUtil<any>;
}

export type Options = MagicUtilities & {
  this: ThisType<any>;
  e?: Event;
  config: Config;
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
    initializeCSPineScopes();

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
