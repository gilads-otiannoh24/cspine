import { Config, CSPineUtil } from "@/CSPine";
import { MagicUtilities } from "alpinejs";

export interface ArrayUtils {}

export function array(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<ArrayUtils> {
  return {
    $config: {
      name: "array",
    },
  };
}
