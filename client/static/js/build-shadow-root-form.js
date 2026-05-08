!(function () {
  // Create styles
  const style = document.createElement("style");
  style.textContent = `
    input {
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 0.5rem;
    }
  `;

  const container = document.getElementById("form-container");

  // Create open shadow root for the form container
  const formShadow = container.attachShadow({ mode: "open" });

  // Create form elements
  const form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", "/login");

  // Username field container
  const usernameContainer = document.createElement("div");

  const usernameLabel = document.createElement("label");
  usernameLabel.textContent = "Username";

  // Create closed shadow root for username input
  const usernameShadowHost = document.createElement("div");
  const usernameShadow = usernameShadowHost.attachShadow({ mode: "closed" });
  usernameShadow.append(style.cloneNode(true));

  const usernameInput = document.createElement("input");
  usernameInput.type = "text";
  usernameInput.name = "username";
  usernameInput.placeholder = "e.g. jsmith, jsmith@example.com";
  usernameInput.required = true;

  usernameShadow.appendChild(usernameInput);

  // Mirror for observability — closed shadow roots aren't queryable from outside
  const usernameMirror = document.createElement("output");
  usernameMirror.setAttribute("data-mirror", "username");
  usernameInput.addEventListener("input", () => {
    usernameMirror.textContent = usernameInput.value;
  });
  usernameInput.addEventListener("change", () => {
    usernameMirror.textContent = usernameInput.value;
  });

  usernameContainer.append(usernameLabel, usernameShadowHost, usernameMirror);

  // Password field container
  const passwordContainer = document.createElement("div");

  const passwordLabel = document.createElement("label");
  passwordLabel.textContent = "Password";

  // Create closed shadow root for password input
  const passwordShadowHost = document.createElement("div");
  const passwordShadow = passwordShadowHost.attachShadow({ mode: "closed" });
  passwordShadow.append(style.cloneNode(true));

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.name = "password";
  passwordInput.required = true;

  passwordShadow.appendChild(passwordInput);

  // Mirror for observability — closed shadow roots aren't queryable from outside
  const passwordMirror = document.createElement("output");
  passwordMirror.setAttribute("data-mirror", "password");
  passwordInput.addEventListener("input", () => {
    passwordMirror.textContent = passwordInput.value;
  });
  passwordInput.addEventListener("change", () => {
    passwordMirror.textContent = passwordInput.value;
  });

  passwordContainer.append(passwordLabel, passwordShadowHost, passwordMirror);

  // Submit button container
  const buttonContainer = document.createElement("div");

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Login";

  buttonContainer.appendChild(submitButton);

  // Assemble the form
  form.append(usernameContainer, passwordContainer, buttonContainer);

  // Add form to the open shadow root
  formShadow.append(form);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const response = await fetch("/login", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({
        usernameInput: usernameInput.value,
        passwordInput: passwordInput.value,
      }),
    });

    if (response.redirected) {
      window.location.href = response.url;
    }
  });
})();
