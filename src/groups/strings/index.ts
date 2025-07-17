import { Config, CSPineUtil } from "@/CSPine";
import { MagicUtilities } from "alpinejs";
import { join } from "./join";

export interface StringUtils {
  join(e: Event): string;
}

export function string(
  el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<StringUtils> {
  return {
    join(e) {
      return join(el, { ...options, e, config, this: this });
    },
    $config: {
      name: "string",
    },
  };
}
