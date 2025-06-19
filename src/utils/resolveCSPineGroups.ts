import { CSPineGroup, CSPineUtils } from "@/CSPine";
import { array } from "@/groups/arrays";
import { bool } from "@/groups/bool";
import { date } from "@/groups/dates";
import { logic } from "@/groups/logics";
import state from "@/groups/states";
import { string } from "@/groups/strings";
import { ui } from "@/groups/ui";
import { util } from "@/groups/utils";

export function resolveCSPineGroups(
  el: HTMLElement,
  groups: CSPineGroup[]
): Partial<CSPineUtils> {
  if (groups.length === 0) {
    return {
      state: state(el),
      array: array(el),
      util: util(el),
      date: date(el),
      logic: logic(el),
      string: string(el),
      bool: bool(el),
      ui: ui(el),
    };
  }

  const results: Partial<CSPineUtils> = {};

  groups.forEach((group) => {
    const g = group(el);
    results[g.$config.name] = g;
  });

  return results;
}
