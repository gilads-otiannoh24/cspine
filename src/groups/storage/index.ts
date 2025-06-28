import { Config, CSPineUtil } from "@/CSPine";
import { MagicUtilities } from "alpinejs";

export interface StorageUtils {}

export function storage(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<StorageUtils> {
  return {
    $config: {
      name: "storage",
    },
  };
}
