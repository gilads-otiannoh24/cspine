import utils from "@src/utils";

document.addEventListener("alpine:init", () => {
  window.Alpine.plugin(utils);
});
