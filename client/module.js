import CSPine, { data } from "../dist/module.mjs";
import Alpine from "../node_modules/alpinejs/dist/module.esm.js";

window.Alpine = Alpine;

Alpine.data("CSPine", () => data);

Alpine.plugin(CSPine);
Alpine.start();
