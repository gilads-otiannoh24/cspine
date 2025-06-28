import { Config, CSPineUtil } from "@/CSPine";
import { MagicUtilities } from "alpinejs";

export interface TimeUtils {}

export function time(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<TimeUtils> {
  return {
    $config: {
      name: "time",
    },
  };
}
