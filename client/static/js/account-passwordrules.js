!(function () {
  const rulesInput = document.getElementById("passwordrules-input");
  const passwordInput = document.getElementById("password");

  if (!rulesInput || !passwordInput) {
    return;
  }

  rulesInput.value = passwordInput.getAttribute("passwordrules") || "";

  rulesInput.addEventListener("input", function () {
    passwordInput.setAttribute("passwordrules", rulesInput.value);
  });
})();
