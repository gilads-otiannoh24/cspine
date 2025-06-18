import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export function dec(el: HTMLElement, alpine: AlpineComponent<any>) {
  const ctx = useContext(alpine, alpine, "dec", "var", true);

  const cp = ctx.cp;

  const varName = ctx.varName;
  let variable = accessVariable(cp, varName);

  if (typeof variable === "number") {
    accessVariable(cp, varName, "set", --variable);
  } else {
    console.warn(
      "CSPUtils::state.dec - Variable cannot be incremented as it is not a number",
      el
    );
  }
}
