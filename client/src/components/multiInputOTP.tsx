import { useState } from "react";
import styled from "@emotion/styled";
import { MuiOtpInput } from "mui-one-time-password-input";

function validateChar(value: string) {
  // only accept single digit values
  return !!value.match(/^\d{1}$/g)?.length;
}

function handleInputEvent(event: React.ChangeEvent<HTMLInputElement>) {
  if (event.nativeEvent.data && !validateChar(event.nativeEvent.data)) {
    event.target.value = "";
  }
}

export const OTPMultiInput = () => {
  const [otp, setOtp] = useState("");

  return (
    <MuiOtpInputStyled
      value={otp}
      length={6}
      onChange={(newValue) => {
        setOtp(newValue);
      }}
      TextFieldsProps={(index: number) => ({
        name: `otp-code-${index}`,
        type: "number",
        placeholder: " ",
        autoComplete: "one-time-code",
        inputProps: {
          // workaround for `validateChar` prop not working properly on Firefox/Safari
          onInput: handleInputEvent,
          required: true,
        },
      })}
    />
  );
};

const MuiOtpInputStyled = styled(MuiOtpInput)`
  gap: 0.5rem;
  margin-inline: auto;
  max-width: 336px;

  .MuiInputBase-root {
    border-radius: var(--ifm-pagination-nav-border-radius);
    background-color: var(--ifm-color-secondary-lightest);

    :hover {
      background-color: var(--ifm-color-secondary-light);
    }

    .MuiInputBase-input {
      -webkit-appearance: none;
      -webkit-touch-callout: none;
      -moz-appearance: textfield;
      caret-color: transparent;
      box-sizing: border-box;
      margin: 0;
      outline: none;
      padding: 0;
      width: 100%;
      min-height: 4rem;
      text-align: center;
      text-overflow: ellipsis;
      line-height: 2rem;
      font-size: 1.5rem;

      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;
