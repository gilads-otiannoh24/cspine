import { Config, CSPineUtil } from "@/CSPine";
import { MagicUtilities } from "alpinejs";

export interface StringUtils {}

export function string(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<StringUtils> {
  return {
    $config: {
      name: "string",
    },
  };
}
