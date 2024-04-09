!(function () {
  const submitButton = document.querySelector(
    'button[type="submit"]#search-submit',
  );
  const input = document.querySelector("input.typeless-search-input");

  submitButton.addEventListener("click", async () => {
    if (!input) {
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
      body: JSON.stringify({ q: input.value }),
    });

    if (response.redirected) {
      window.location.href = response.url;
    }
  });
})();
