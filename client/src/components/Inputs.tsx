import { FormEvent, ReactEventHandler, RefObject } from "react";

export function UsernameInput({
  inputRef,
}: {
  inputRef?: RefObject<HTMLInputElement>;
}) {
  return (
    <div className="row margin-bottom--md">
      <label htmlFor="username" className="margin-right--sm">
        Username
      </label>
      <input
        ref={inputRef}
        type="text"
        name="username"
        id="username"
        placeholder="e.g. jsmith"
        required
      />
    </div>
  );
}

export function EmailInput({
  inputRef,
}: {
  inputRef?: RefObject<HTMLInputElement>;
}) {
  return (
    <div className="row margin-bottom--md">
      <label htmlFor="email" className="margin-right--sm">
        Email
      </label>
      <input
        ref={inputRef}
        type="email"
        name="email"
        id="email"
        placeholder="e.g. jsmith@example.com"
        required
      />
    </div>
  );
}

export function PasswordInput({
  inputRef,
}: {
  inputRef?: RefObject<HTMLInputElement>;
}) {
  return (
    <div className="row margin-bottom--md">
      <label htmlFor="password" className="margin-right--sm">
        Password
      </label>
      <input
        ref={inputRef}
        type="password"
        name="password"
        id="password"
        required
      />
    </div>
  );
}

export function CurrentPasswordInput({
  inputRef,
}: {
  inputRef?: RefObject<HTMLInputElement>;
}) {
  return (
    <div className="row margin-bottom--md">
      <label htmlFor="current-password" className="margin-right--sm">
        Current Password
      </label>
      <input
        ref={inputRef}
        type="password"
        name="current-password"
        autoComplete="current-password"
        id="current-password"
        required
      />
    </div>
  );
}

export function NewPasswordInput({
  inputRef,
}: {
  inputRef?: RefObject<HTMLInputElement>;
}) {
  return (
    <div className="row margin-bottom--md">
      <label htmlFor="new-password" className="margin-right--sm">
        New password
      </label>
      <input
        ref={inputRef}
        type="password"
        name="new-password"
        autoComplete="new-password"
        id="new-password"
        required
        spellCheck="false"
      />
    </div>
  );
}

export function ConfirmNewPasswordInput() {
  return (
    <div className="row margin-bottom--md">
      <label htmlFor="new-password-retype" className="margin-right--sm">
        Confirm new password
      </label>
      <input
        autoComplete="new-password"
        id="new-password-retype"
        name="new-password-retype"
        required
        spellCheck="false"
        type="password"
      />
    </div>
  );
}

export function SecurityQuestionInput({
  inputRef,
  question = "What was the name of your first pet?",
  placeholder = "e.g. Fluffy",
  name = "security-question",
  id = "security-question",
}: {
  inputRef?: RefObject<HTMLInputElement>;
  question?: string;
  placeholder?: string;
  name?: string;
  id?: string;
}) {
  return (
    <div className="row margin-bottom--md">
      <label htmlFor={id} className="margin-right--sm">
        {question}
      </label>
      <input
        ref={inputRef}
        type="text"
        name={name}
        id={id}
        autoComplete="off"
        spellCheck="false"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

// Common security question variants for easy reuse
export function MothersMaidenNameInput({
  inputRef,
}: {
  inputRef?: RefObject<HTMLInputElement>;
}) {
  return (
    <SecurityQuestionInput
      inputRef={inputRef}
      question="What is your mother's maiden name?"
      placeholder="e.g. Smith"
      name="mothers-maiden-name"
      id="mothers-maiden-name"
    />
  );
}

export function FirstPetNameInput({
  inputRef,
}: {
  inputRef?: RefObject<HTMLInputElement>;
}) {
  return (
    <SecurityQuestionInput
      inputRef={inputRef}
      question="What was the name of your first pet?"
      placeholder="e.g. Fluffy"
      name="first-pet-name"
      id="first-pet-name"
    />
  );
}

export function ElementarySchoolInput({
  inputRef,
}: {
  inputRef?: RefObject<HTMLInputElement>;
}) {
  return (
    <SecurityQuestionInput
      inputRef={inputRef}
      question="What was the name of your elementary school?"
      placeholder="e.g. Lincoln Elementary"
      name="elementary-school"
      id="elementary-school"
    />
  );
}

export function SubmitButton({
  handleSelect,
  label,
}: {
  handleSelect?: ReactEventHandler;
  label: string;
}) {
  return (
    <div className="row">
      <button
        type="submit"
        className="col col--4 col--offset-4 button button--primary"
        onClick={handleSelect}
      >
        {label}
      </button>
    </div>
  );
}
