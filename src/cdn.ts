import CSPine from "@/CSPine";

document.addEventListener("alpine:init", () => {
  window.Alpine.plugin(CSPine.plugin);
});
