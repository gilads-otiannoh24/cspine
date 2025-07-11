import { Config, CSPineUtil } from "@/CSPine";
import { useContext } from "@/utils/useContext";
import { AlpineComponent, MagicUtilities } from "alpinejs";

export interface LogicUtils {}

export function logic(
  $el: HTMLElement,
  options: MagicUtilities,
  config: Config
): CSPineUtil<LogicUtils> {
  return {
    $config: {
      name: "logic",
    },
  };
}
