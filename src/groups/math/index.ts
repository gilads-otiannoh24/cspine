import { Config, CSPineUtil } from "@/CSPine";
import { MagicUtilities } from "alpinejs";

export interface MathUtils {}

export function math(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<MathUtils> {
  return {
    $config: {
      name: "math",
    },
  };
}
