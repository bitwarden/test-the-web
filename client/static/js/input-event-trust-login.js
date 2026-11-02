!(function () {
  if (window.__IET_INITIALIZED) {
    return;
  }
  window.__IET_INITIALIZED = true;

  const RECONCILE_INTERVAL_MS = 100;
  const TRACKED_IDS = ["username", "password"];
  const frameworkState = { username: "", password: "" };

  function getForm() {
    return document.getElementById("iet-form");
  }

  function getTrackedInput(id) {
    const form = getForm();
    return form ? form.querySelector("#" + id) : null;
  }

  function isTracked(target) {
    const form = getForm();
    return (
      form !== null &&
      target instanceof HTMLInputElement &&
      TRACKED_IDS.includes(target.id) &&
      form.contains(target)
    );
  }

  function captureIfTrusted(event) {
    if (!event.isTrusted) {
      return;
    }
    if (!isTracked(event.target)) {
      return;
    }
    frameworkState[event.target.id] = event.target.value;
  }

  function reconcile() {
    if (!getForm()) {
      return;
    }
    TRACKED_IDS.forEach(function (id) {
      const input = getTrackedInput(id);
      if (!input) {
        return;
      }
      if (input.value !== frameworkState[id]) {
        input.value = frameworkState[id];
      }
    });
  }

  // Delegated listener on document survives React/Docusaurus hydration and
  // SPA navigation. DOM access is scoped to #iet-form so stale references
  // cannot interfere with sibling pages that share id="username" / id="password".
  document.addEventListener("input", captureIfTrusted, true);

  setInterval(reconcile, RECONCILE_INTERVAL_MS);
})();
