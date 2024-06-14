import { useMemo, useRef, useState } from "react";
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

type LoginValues = {
  username?: string;
  email?: string;
  password?: string;
};

export function LoginFormless({
  action,
  stepButtonLabel = "Next",
  submitButtonLabel = "Submit",
}: {
  action: string;
  stepButtonLabel?: string;
  submitButtonLabel?: string;
}): JSX.Element {
  const [loginValues, setLoginValues] = useState<LoginValues>({});
  const currentInputRef = useRef<HTMLInputElement>(null);
  const [currentFormStep, setCurrentFormStep] = useState<
    FormSteps | undefined
  >();

  useMemo(() => {
    switch (currentFormStep) {
      case FormSteps.Username:
        setCurrentFormStep(FormSteps.Email);
        break;
      case FormSteps.Email:
        setCurrentFormStep(FormSteps.Password);
        break;
      case FormSteps.Password:
        submitFormData(action, loginValues);
        break;
      default:
        setCurrentFormStep(FormSteps.Username);
        break;
    }
  }, [loginValues]);

  function handleStep() {
    const stepInputValue = currentInputRef.current?.value;

    if (currentFormStep && stepInputValue) {
      setLoginValues({
        ...loginValues,
        ...{ [currentFormStep]: stepInputValue },
      });
    }
  }

  return (
    <div className="card__body">
      {currentFormStep === FormSteps.Username ? (
        <UsernameInput inputRef={currentInputRef} />
      ) : currentFormStep === FormSteps.Email ? (
        <EmailInput inputRef={currentInputRef} />
      ) : currentFormStep === FormSteps.Password ? (
        <PasswordInput inputRef={currentInputRef} />
      ) : (
        <p>Welcome! Please click the "next" button to proceed.</p>
      )}

      <SubmitButton
        handleSelect={handleStep}
        label={
          currentFormStep === FormSteps.Password
            ? submitButtonLabel
            : stepButtonLabel
        }
      />
    </div>
  );
}

function submitFormData(action: string, data: LoginValues | object) {
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
