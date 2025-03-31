import {
  useMemo,
  useState,
  SetStateAction,
  ReactElement,
  FormEvent,
  useEffect,
} from "react";
import {
  EmailInput,
  PasswordInput,
  SubmitButton,
  UsernameInput,
} from "./Inputs";

export const FormSteps = {
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
  formSteps = [],
  action,
  stepButtonLabel = "Next",
  submitButtonLabel = "Submit",
}: {
  formSteps: FormSteps[];
  action: string;
  stepButtonLabel?: string;
  submitButtonLabel?: string;
}): JSX.Element {
  const FormStepMap: { [key in FormSteps]: ReactElement } = {
    [FormSteps.Username]: <UsernameInput />,
    [FormSteps.Email]: <EmailInput />,
    [FormSteps.Password]: <PasswordInput />,
  };

  const [formValues, setFormValues] = useState<FormValues>({});
  const [formStepIndex, setformStepIndex] = useState<number>(0);

  useEffect(() => {
    if (formStepIndex === formSteps.length) {
      submitFormData(action, formValues);
    }
  }, [formStepIndex]);

  const handleFormStep = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    setFormValues({ ...formValues, ...Object.fromEntries(formData as any) });
    const nextStep = formStepIndex + 1;
    setformStepIndex(nextStep);
  };
  const isFinalStep = formStepIndex === formSteps.length - 1;

  const handleSubmitSelect = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFormStep(event);
  };

  const currentFormStep = formSteps[formStepIndex];

  return formSteps.length > 0 ? (
    <form className="card__body" onSubmit={handleSubmitSelect}>
      {FormStepMap[currentFormStep]}
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
