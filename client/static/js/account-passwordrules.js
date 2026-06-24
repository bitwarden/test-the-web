!(function () {
  const rulesInput = document.getElementById("passwordrules-input");
  const passwordInput = document.getElementById("password");

  if (!rulesInput || !passwordInput) {
    return;
  }

  rulesInput.value = passwordInput.getAttribute("passwordrules") || "";

  let debounceTimer;
  rulesInput.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      passwordInput.setAttribute("passwordrules", rulesInput.value);
    }, 300);
  });
})();
