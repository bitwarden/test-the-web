!(function () {
  const form = document.querySelector("form.card__body");
  const formButton = form.querySelector('button[type="submit"]');
  const newPassword = document.querySelector("input#newPassword");
  const newPasswordRetype = document.querySelector("input#newPasswordRetype");
  const errorContainer = document.querySelector("#error-container");

  function isFormInputValid() {
    return (
      newPassword?.value?.length &&
      newPassword?.value === newPasswordRetype?.value
    );
  }

  form.addEventListener("submit", (action) => {
    const formIsValid = isFormInputValid();

    if (formIsValid) {
      return;
    }

    action.preventDefault();
  });

  form.addEventListener("change", () => {
    const formIsValid = isFormInputValid();
    const shouldDisplayError = newPassword?.value?.length && !formIsValid;

    formButton.disabled = !formIsValid;

    errorContainer.style.display = shouldDisplayError ? "inline-block" : "none";
  });
})();
