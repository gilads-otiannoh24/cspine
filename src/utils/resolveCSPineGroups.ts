import { Config, CSPineGroup, CSPineUtils } from "@/CSPine";
import {
  array,
  bool,
  date,
  logic,
  math,
  state,
  storage,
  string,
  time,
  type,
  ui,
  util,
} from "@/groups";
import { MagicUtilities } from "alpinejs";

export function resolveCSPineGroups(
  el: HTMLElement,
  groups: CSPineGroup[],
  options: MagicUtilities,
  config: Config
): Partial<CSPineUtils> {
  if (groups.length === 0) {
    return {
      state: state(el, options, config),
      array: array(el, options, config),
      util: util(el, options, config),
      date: date(el, options, config),
      logic: logic(el, options, config),
      string: string(el, options, config),
      bool: bool(el, options, config),
      ui: ui(el, options, config),
      math: math(el, options, config),
      storage: storage(el, options, config),
      time: time(el, options, config),
      type: type(el, options, config),
    };
  }

  const results: Partial<CSPineUtils> = {};

  groups.forEach((group) => {
    const g = group(el, options, config);
    results[g.$config.name] = g;
  });

  return results;
}
