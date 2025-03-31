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
        className="button button--primary"
        onClick={handleSelect}
        onSelect={handleSelect}
      >
        {label}
      </button>
    </div>
  );
}
