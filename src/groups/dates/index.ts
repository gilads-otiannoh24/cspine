import { Config, CSPineUtil } from "@/CSPine";
import { MagicUtilities } from "alpinejs";

export interface DateUtils {}

export function date(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<DateUtils> {
  return {
    $config: {
      name: "date",
    },
  };
}
