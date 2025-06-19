import { accessVariable } from "@/utils/accessVariable";
import { useContext } from "@/utils/useContext";
import { AlpineComponent } from "alpinejs";

export function log(el: HTMLElement, alpine: AlpineComponent<any>) {
  const ctx = useContext(alpine, alpine, "log", "var");

  const cp = ctx.cp;

  if (!Array.isArray(ctx.varName)) {
    return console.log(accessVariable(cp, ctx.varName));
  }

  const varNames = ctx.varName;

  varNames.forEach((varName) => {
    console.log(accessVariable(cp, varName));
  });
}
