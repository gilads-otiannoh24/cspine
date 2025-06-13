import utils from "../dist/utils.js";
import Alpine from "../node_modules/alpinejs/dist/module.esm.js";

window.Alpine = Alpine;

Alpine.plugin(utils);
Alpine.start();
