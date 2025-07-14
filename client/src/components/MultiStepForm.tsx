import { useState, ReactElement, FormEvent, useEffect, JSX } from "react";

import {
  ConfirmNewPasswordInput,
  CurrentPasswordInput,
  EmailInput,
  NewPasswordInput,
  PasswordInput,
  SubmitButton,
  UsernameInput,
} from "./Inputs";

export const FormStep = {
  Username: "username",
  Email: "email",
  Password: "password",
  NewPassword: "new-password",
  CurrentPassword: "current-password",
  ConfirmPassword: "confirm-password",
} as const;

type FormStep = (typeof FormStep)[keyof typeof FormStep];

type FormValues = {
  username?: string;
  email?: string;
  password?: string;
};

export function MultiStepForm({
  formSteps = [],
  action,
  stepButtonLabel = "Next",
  submitButtonLabel = "Submit",
}: {
  formSteps: Array<FormStep | FormStep[]>;
  action: string;
  stepButtonLabel?: string;
  submitButtonLabel?: string;
}): JSX.Element {
  const FormStepMap: { [key in FormStep]: ReactElement } = {
    [FormStep.Username]: <UsernameInput />,
    [FormStep.Email]: <EmailInput />,
    [FormStep.Password]: <PasswordInput />,
    [FormStep.CurrentPassword]: <CurrentPasswordInput />,
    [FormStep.NewPassword]: <NewPasswordInput />,
    [FormStep.ConfirmPassword]: <ConfirmNewPasswordInput />,
  };

  const [formValues, setFormValues] = useState<FormValues>({});
  const [formStepIndex, setFormStepIndex] = useState<number>(0);

  useEffect(() => {
    if (formStepIndex === formSteps.length) {
      submitFormData(action, formValues);
    }
  }, [formStepIndex]);

  const handleFormStep = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    setFormValues({ ...formValues, ...Object.fromEntries(formData as any) });
    const nextStep = formStepIndex + 1;
    setFormStepIndex(nextStep);
  };
  const isFinalStep = formStepIndex === formSteps.length - 1;

  const handleSubmitSelect = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFormStep(event);
  };

  const currentFormStep = Array.isArray(formSteps[formStepIndex])
    ? formSteps[formStepIndex].map((el) => FormStepMap[el])
    : FormStepMap[formSteps[formStepIndex]];

  return formSteps.length > 0 ? (
    <form className="card__body" onSubmit={handleSubmitSelect}>
      {currentFormStep}
      <SubmitButton label={isFinalStep ? submitButtonLabel : stepButtonLabel} />
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
