import { useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { FormSteps, LoginForm } from "@site/src/components/LoginForm";

export function HiddenLogin() {
  const [showLogin, setShowLogin] = useState(false);

  function handleShowLogin() {
    return setShowLogin(!showLogin);
  }

  return (
    <div>
      <div
        className="button button--link padding--none"
        role="button"
        onClick={handleShowLogin}
        onSelect={handleShowLogin}
      >
        {showLogin ? "Hide login" : "Show login"}
      </div>
      {showLogin && (
        <ZoomAndFadeInLoginFormContainer>
          <LoginForm
            action="/login"
            formSteps={[
              FormSteps.Username,
              FormSteps.Email,
              FormSteps.Password,
            ]}
          />
        </ZoomAndFadeInLoginFormContainer>
      )}
    </div>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
`;

const zoomEnter = keyframes`
  0% {
    transform: scale3d(.3, .3, .3);
  }
`;

const ZoomAndFadeInLoginFormContainer = styled.div`
  animation: ${fadeIn} ease-in both;
  animation: ${zoomEnter} cubic-bezier(0.4, 0, 0, 1.5) both;
  animation-duration: 300ms;
`;
