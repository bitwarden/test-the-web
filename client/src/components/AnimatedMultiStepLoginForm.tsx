import { useState, useEffect, useRef, JSX } from "react";

/**
 * Reproduces the Synology DSM (PM-45345) autofill inline menu bug.
 *
 * Pattern:
 * - Two separate forms: username form and password form.
 * - The password form is not in the DOM at all during step 1.
 * - When the user advances, the password form is mounted at opacity: 0.
 *   A useEffect then adds a class that transitions opacity to 1, so the
 *   browser fires transitionend (not animationend) — matching Synology's
 *   Vue transition behaviour.
 * - Bitwarden's MutationObserver fires the instant the password form is added
 *   to the DOM. At that moment opacity is 0, so isElementHiddenByCss returns
 *   true and the inline menu is not attached.
 * - autoFocus fires immediately at mount while opacity is still 0, so there
 *   is no subsequent focus event once the transition completes.
 * - After blur + refocus the transition is done (opacity: 1) and the inline
 *   menu appears correctly — this is the user-visible symptom.
 */

const TRANSITION_DURATION_MS = 500;

const transitionStyle = `
  .ttw-password-step {
    opacity: 0;
    transition: opacity ${TRANSITION_DURATION_MS}ms ease;
  }
  .ttw-password-step.ttw-visible {
    opacity: 1;
  }
`;

function PasswordStep({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force a reflow so the browser registers the starting opacity: 0,
    // then add the class to trigger the CSS transition to opacity: 1.
    // This causes transitionend to fire (not animationend).
    if (ref.current) {
      // Read a layout property to flush the reflow
      void ref.current.offsetHeight;
      ref.current.classList.add("ttw-visible");
    }
  }, []);

  return (
    <div ref={ref} className="ttw-password-step">
      <form onSubmit={onSubmit}>
        <div className="row margin-bottom--md">
          <label htmlFor="ms-anim-password" className="margin-right--sm">
            Password
          </label>
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            type="password"
            id="ms-anim-password"
            name="password"
            autoComplete="current-password"
            required
          />
        </div>
        <div className="row">
          <button
            type="submit"
            className="col col--4 col--offset-4 button button--primary"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export function AnimatedMultiStepLoginForm({
  action,
}: {
  action: string;
}): JSX.Element {
  const [step, setStep] = useState<"username" | "password">("username");
  const [usernameValue, setUsernameValue] = useState("");

  const handleUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setUsernameValue((data.get("username") as string) ?? "");
    setStep("password");
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    fetch(action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameValue,
        password: data.get("password"),
      }),
    }).then(({ url }) => {
      if (url) window.location.href = url;
    });
  };

  return (
    <div className="card__body">
      <style>{transitionStyle}</style>

      {step === "username" && (
        <form onSubmit={handleUsernameSubmit}>
          <div className="row margin-bottom--md">
            <label htmlFor="ms-anim-username" className="margin-right--sm">
              Username
            </label>
            <input
              type="text"
              id="ms-anim-username"
              name="username"
              placeholder="e.g. admin"
              required
            />
          </div>
          <div className="row">
            <button
              type="submit"
              className="col col--4 col--offset-4 button button--primary"
            >
              Next
            </button>
          </div>
        </form>
      )}

      {step === "password" && <PasswordStep onSubmit={handlePasswordSubmit} />}
    </div>
  );
}
