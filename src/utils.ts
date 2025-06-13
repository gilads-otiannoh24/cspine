import { AlpineComponent, Alpine as AlpineGlobal } from "alpinejs";
import { resolveData } from "@src/utils/resolveDatasetValue";
import { getAlpineInstance } from "@src/utils/getAlpineInstance";
import { accessVariable } from "@src/utils/accessVariable";
import { useContext } from "./utils/useContext";
import { states, StateUtils } from "./groups/state";
import { array, ArrayUtils } from "./groups/array";
import { UtilsFns, utilsFns } from "./groups/utils";
import { dates, DateUtils } from "./groups/date";
import { logic, LogicUtils } from "./groups/logic";
import { string, StringUtils } from "./groups/string";

interface Utils {
  state: StateUtils;
  array: ArrayUtils;
  utils: UtilsFns;
  date: DateUtils;
  logic: LogicUtils;
  string: StringUtils;
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
    })
  );
}
