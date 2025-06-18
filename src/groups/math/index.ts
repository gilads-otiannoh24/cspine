import { CSPineUtil } from "@/CSPine";

export interface MathUtils {}

export function math($el: HTMLElement): CSPineUtil<MathUtils> {
  return {
    $config: {
      name: "array",
    },
  };
}
