import { useMemo, useState, SetStateAction } from "react";
import {
  EmailInput,
  PasswordInput,
  SubmitButton,
  UsernameInput,
} from "./Inputs";

const FormSteps = {
  Username: "username",
  Email: "email",
  Password: "password",
} as const;

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

      <SubmitButton
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
        <SubmitButton label={submitButtonLabel} />
      </div>
    </form>
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
