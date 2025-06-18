import { CSPineUtil } from "@/CSPine";

export interface DateUtils {}

export function date($el: HTMLElement): CSPineUtil<DateUtils> {
  return {
    $config: {
      name: "date",
    },
  };
}
