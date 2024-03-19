!(function () {
  const form = document.querySelector("form.card__body");

  function isFormInputValid() {
    const newPassword = document.querySelector("input#newPassword");
    const newPasswordRetype = document.querySelector("input#newPasswordRetype");

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
    const newPassword = document.querySelector("input#newPassword");
    const errorContainer = document.querySelector("#error-container");
    const shouldDisplayError = newPassword?.value?.length && !formIsValid;

    form.querySelector('button[type="submit"]').disabled = !formIsValid;

    errorContainer.style.display = shouldDisplayError ? "inline-block" : "none";
  });
})();
