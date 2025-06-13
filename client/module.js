import utils from "../node_modules/@gilads-otiannoh24/alpine-csp-utils/dist/utils.esm.js";
import Alpine from "../node_modules/alpinejs/dist/module.esm.js";

window.Alpine = Alpine;

Alpine.plugin(utils);
Alpine.start();
