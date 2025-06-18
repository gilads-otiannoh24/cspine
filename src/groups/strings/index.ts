import { CSPineUtil } from "@/CSPine";

export interface StringUtils {}

export function string($el: HTMLElement): CSPineUtil<StringUtils> {
  return {
    $config: {
      name: "string",
    },
  };
}
