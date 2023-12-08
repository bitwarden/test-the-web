import { useMemo, useState, SetStateAction } from "react";

const FormSteps = {
  Username: "username",
  Email: "email",
  Password: "password",
};

type FormSteps = (typeof FormSteps)[keyof typeof FormSteps];

type FormValues = {
  username?: string;
  email?: string;
  password?: string;
};

export function LoginForm({
  action,
  isMultiStep = false,
  stepButtonLabel = "Next",
  submitButtonLabel = "Submit",
}: {
  action: string;
  isMultiStep?: boolean;
  stepButtonLabel?: string;
  submitButtonLabel?: string;
}): JSX.Element {
  const [formValues, setFormValues] = useState<SetStateAction<FormValues>>({});
  const [currentFormStep, setCurrentFormStep] =
    useState<SetStateAction<FormSteps | undefined>>();

  useMemo(() => {
    switch (currentFormStep) {
      case FormSteps.Username:
        setCurrentFormStep(FormSteps.Email);
        break;
      case FormSteps.Email:
        setCurrentFormStep(FormSteps.Password);
        break;
      case FormSteps.Password:
        submitFormData(action, formValues);
        break;
      default:
        setCurrentFormStep(FormSteps.Username);
        break;
    }
  }, [formValues]);

  function handleFormStep(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    setFormValues({ ...formValues, ...Object.fromEntries(formData as any) });
  }

  return isMultiStep ? (
    <form className="card__body" onSubmit={handleFormStep}>
      {currentFormStep === FormSteps.Username ? (
        <UsernameInput />
      ) : currentFormStep === FormSteps.Email ? (
        <EmailInput />
      ) : currentFormStep === FormSteps.Password ? (
        <PasswordInput />
      ) : (
        <p>Welcome! Please click the "next" button to proceed.</p>
      )}

      <FormButton
        label={
          currentFormStep === FormSteps.Password
            ? submitButtonLabel
            : stepButtonLabel
        }
      />
    </form>
  ) : (
    <form className="card__body" method="POST" action="/login">
      <UsernameInput />
      <EmailInput />
      <PasswordInput />
      <div className="row">
        <FormButton label={submitButtonLabel} />
      </div>
    </form>
  );
}

function UsernameInput() {
  return (
    <div className="row margin-bottom--md">
      <label htmlFor="username" className="margin-right--sm">
        Username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="e.g. jsmith"
        required
      />
    </div>
  );
}

function EmailInput() {
  return (
    <div className="row margin-bottom--md">
      <label htmlFor="email" className="margin-right--sm">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="e.g. jsmith@example.com"
        required
      />
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="row margin-bottom--md">
      <label htmlFor="password" className="margin-right--sm">
        Password
      </label>
      <input type="password" name="password" id="password" required />
    </div>
  );
}

function FormButton({ label }: { label: string }) {
  return (
    <div className="row">
      <button type="submit" className="button button--primary">
        {label}
      </button>
    </div>
  );
}

function submitFormData(action: string, data: FormValues | object) {
  fetch(action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(({ url }) => {
    if (url) {
      window.location.href = url;
    }
  });
}
