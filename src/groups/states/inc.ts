import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export function inc(el: HTMLElement, alpine: AlpineComponent<any>) {
  const ctx = useContext(alpine, alpine, "inc", "var", true);

  const cp = ctx.cp;
  const varName = ctx.varName;
  let variable = accessVariable(cp, varName);

  if (typeof variable === "number") {
    accessVariable(cp, varName, "set", ++variable);
  } else {
    console.warn(
      "CSPUtils::inc - Variable cannot be incremented as it is not a number",
      el
    );
  }
}
