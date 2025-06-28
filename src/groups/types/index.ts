import { Config, CSPineUtil } from "@/CSPine";
import { MagicUtilities } from "alpinejs";

export interface TypesUtils {}

export function type(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<TypesUtils> {
  return {
    $config: {
      name: "type",
    },
  };
}
