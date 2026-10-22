!(function () {
  const LOG_LIMIT = 10;
  const TEST_USERNAME = "user@example.com";
  const TEST_PASSWORD = "password123";
  // focusin/focusout bubble; focus/blur do not. Using the bubbling variants
  // lets us attach a single delegated listener on document.
  const OBSERVED_EVENTS = [
    "beforeinput",
    "input",
    "change",
    "keydown",
    "keyup",
    "focusin",
    "focusout",
  ];

  const pageLoadedAt = performance.now();

  function relativeTime() {
    return (performance.now() - pageLoadedAt).toFixed(1);
  }

  function fmt(value) {
    if (value === undefined) {
      return "—";
    }
    if (value === null) {
      return "null";
    }
    return String(value);
  }

  function logListFor(inputId) {
    if (inputId === "username") {
      return document.getElementById("iet-log-username");
    }
    if (inputId === "password") {
      return document.getElementById("iet-log-password");
    }
    return null;
  }

  function appendLogRow(logList, event) {
    const row = document.createElement("li");
    row.className = event.isTrusted
      ? "iet-log-row iet-log-row--trusted"
      : "iet-log-row iet-log-row--synthetic";

    const inputType = "inputType" in event ? event.inputType : undefined;
    const data = "data" in event ? event.data : undefined;
    const key = "key" in event ? event.key : undefined;

    row.innerHTML =
      '<span class="iet-log-time">t+' +
      fmt(relativeTime()) +
      "ms</span>" +
      '<span class="iet-log-type">' +
      fmt(event.type) +
      "</span>" +
      '<span class="iet-log-trusted">isTrusted=' +
      fmt(event.isTrusted) +
      "</span>" +
      '<span class="iet-log-inputtype">inputType=' +
      fmt(inputType) +
      "</span>" +
      '<span class="iet-log-data">data=' +
      fmt(data) +
      "</span>" +
      '<span class="iet-log-key">key=' +
      fmt(key) +
      "</span>";

    logList.insertBefore(row, logList.firstChild);

    while (logList.children.length > LOG_LIMIT) {
      logList.removeChild(logList.lastChild);
    }
  }

  const strategies = {
    "direct-assignment": function (input, value) {
      input.value = value;
    },
    "assignment-plain-event": function (input, value) {
      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    },
    "assignment-input-event": function (input, value) {
      input.value = value;
      input.dispatchEvent(
        new InputEvent("input", {
          data: value,
          inputType: "insertText",
          bubbles: true,
        }),
      );
    },
    "native-setter-input-event": function (input, value) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      ).set;
      nativeInputValueSetter.call(input, value);
      input.dispatchEvent(
        new InputEvent("input", {
          data: value,
          inputType: "insertText",
          bubbles: true,
        }),
      );
    },
    "exec-command-insert-text": function (input, value) {
      input.focus();
      input.select();
      document.execCommand("insertText", false, value);
    },
  };

  function applyFillStrategy(strategyKey) {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const strategy = strategies[strategyKey];
    if (!usernameInput || !passwordInput || !strategy) {
      return;
    }
    strategy(usernameInput, TEST_USERNAME);
    strategy(passwordInput, TEST_PASSWORD);
    // Strategies that focus/select the input (execCommand) leave the browser
    // in an editing state; the first subsequent click on Submit is consumed
    // by the deselect instead of activating the button. Blur here so Submit
    // works on the first press.
    if (
      document.activeElement === usernameInput ||
      document.activeElement === passwordInput
    ) {
      document.activeElement.blur();
    }
  }

  function renderCapturedState() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const outputArea = document.getElementById("iet-output");
    if (!usernameInput || !passwordInput || !outputArea) {
      return;
    }

    const captured = {
      username: usernameInput.value,
      password: passwordInput.value,
    };
    const domSnapshot = {
      username: usernameInput.getAttribute("value") || "",
      password: passwordInput.getAttribute("value") || "",
    };

    outputArea.textContent =
      "captured (element.value):\n" +
      JSON.stringify(captured, null, 2) +
      '\n\nDOM attribute (element.getAttribute("value")):\n' +
      JSON.stringify(domSnapshot, null, 2);
  }

  function resetAll() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameLogEl = document.getElementById("iet-log-username");
    const passwordLogEl = document.getElementById("iet-log-password");
    const outputArea = document.getElementById("iet-output");
    if (usernameInput) usernameInput.value = "";
    if (passwordInput) passwordInput.value = "";
    if (usernameLogEl) usernameLogEl.innerHTML = "";
    if (passwordLogEl) passwordLogEl.innerHTML = "";
    if (outputArea) outputArea.textContent = "";
  }

  // Delegated listeners on document survive React/Docusaurus hydration and
  // SPA navigation. No need to wait for or re-query the form elements.
  OBSERVED_EVENTS.forEach(function (eventType) {
    document.addEventListener(
      eventType,
      function (event) {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) {
          return;
        }
        if (target.id !== "username" && target.id !== "password") {
          return;
        }
        const logList = logListFor(target.id);
        if (!logList) {
          return;
        }
        appendLogRow(logList, event);
      },
      true,
    );
  });

  document.addEventListener("click", function (event) {
    const strategyBtn = event.target.closest("[data-iet-strategy]");
    if (strategyBtn) {
      applyFillStrategy(strategyBtn.getAttribute("data-iet-strategy"));
      return;
    }
    if (event.target.closest("#iet-reset")) {
      resetAll();
    }
  });

  document.addEventListener("submit", function (event) {
    if (event.target && event.target.id === "iet-form") {
      event.preventDefault();
      renderCapturedState();
    }
  });
})();
