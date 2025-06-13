import { Alpine as AlpineGlobal } from "alpinejs";
import { states, StateUtils } from "./groups/state";
import { array, ArrayUtils } from "./groups/array";
import { UtilsFns, utilsFns } from "./groups/utils";
import { dates, DateUtils } from "./groups/date";
import { logic, LogicUtils } from "./groups/logic";
import { string, StringUtils } from "./groups/string";
import { bool, BooleanUtils } from "./groups/bool";

interface Utils {
  state: StateUtils;
  array: ArrayUtils;
  utils: UtilsFns;
  date: DateUtils;
  logic: LogicUtils;
  string: StringUtils;
  bool: BooleanUtils;
}

export default function utils(Alpine: AlpineGlobal) {
  Alpine.magic(
    "_",
    ($el, { Alpine }): Utils => ({
      state: states($el),
      array: array($el),
      utils: utilsFns($el),
      date: dates($el),
      logic: logic($el),
      string: string($el),
      bool: bool($el),
    })
  );
}
