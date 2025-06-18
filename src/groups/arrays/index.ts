import { CSPineUtil } from "@/CSPine";

export interface ArrayUtils {}

export function array($el: HTMLElement): CSPineUtil<ArrayUtils> {
  return {
    $config: {
      name: "array",
    },
  };
}
