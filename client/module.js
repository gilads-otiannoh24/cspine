import utils from "../dist/module.mjs";
import Alpine from "../node_modules/alpinejs/dist/module.esm.js";

window.Alpine = Alpine;

Alpine.plugin(utils);
Alpine.start();
