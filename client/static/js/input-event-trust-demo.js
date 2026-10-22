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

  function renderOnSubmit() {
    const usernameInput = getTrackedInput("username");
    const passwordInput = getTrackedInput("password");
    const output = document.getElementById("iet-output");
    if (!usernameInput || !passwordInput || !output) {
      return;
    }

    const captured = {
      username: frameworkState.username,
      password: frameworkState.password,
    };
    const dom = {
      username: usernameInput.value,
      password: passwordInput.value,
    };

    output.textContent =
      "form state (what submit would send):\n" +
      JSON.stringify(captured, null, 2) +
      "\n\nDOM value (element.value right now):\n" +
      JSON.stringify(dom, null, 2);
  }

  // Delegated listeners on document survive React/Docusaurus hydration and
  // SPA navigation. All DOM access is scoped to #iet-form so stale references
  // cannot interfere with sibling pages that share id="username" / id="password".
  document.addEventListener("input", captureIfTrusted, true);

  document.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "iet-form") {
      event.preventDefault();
      renderOnSubmit();
    }
  });

  setInterval(reconcile, RECONCILE_INTERVAL_MS);
})();
