!(function () {
  const submitButton = document.querySelector(
    'button[type="submit"]#search-submit',
  );

  function sanitizeStringInput(inputValue) {
    if (typeof inputValue !== "string") {
      return "";
    }

    return inputValue.trim();
  }

  submitButton.addEventListener("click", async () => {
    const inputValue = document.querySelector(
      "input.typeless-search-input",
    )?.value;

    const q = sanitizeStringInput(inputValue);

    if (!q) {
      return;
    }

    const response = await fetch("/search", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({ q }),
    });

    if (response.redirected) {
      window.location.href = response.url;
    }
  });
})();
