import { parseScope } from "../dsl/parse";
import { CSPineTree } from "./CSPineTree";

export const tree = new CSPineTree();

export function initializeCSPineScopes(root: ParentNode = document) {
  const scopedElements = root.querySelectorAll("[data-cspinescope]");

  scopedElements.forEach((el) => {
    const scopeText = el.getAttribute("data-cspinescope");
    if (!scopeText) return;

    try {
      const ast = parseScope(scopeText);
      tree.register(el, ast);
    } catch (err) {
      console.error("[CSPine] Failed to parse scope:", el, err);
    }
  });
}
