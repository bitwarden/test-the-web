import { useLocation } from "@docusaurus/router";
import styled from "@emotion/styled";
import {
  EmailInput,
  PasswordInput,
  SubmitButton,
  UsernameInput,
} from "./Inputs";

export function NestedIframeLogin({
  slug = "nested-iframe-login",
}: {
  slug?: string;
}): JSX.Element {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const depthParam = queryParams.get("depth") || "3";
  const userInputType =
    queryParams.get("userInputType") !== "email" ? "username" : "email";
  const depth = parseInt(depthParam, 10);
  const newDepth = depth - 1;

  const iframeStyle = {
    width: "100%",
    minHeight: `calc(370px + ${depth}rem)`,
  };

  if (depth > 0) {
    const src = `/forms/login/${slug}?depth=${newDepth}&docusaurus-data-bare-page=true`;

    if (depth === 1) {
      return (
        <>
          <FrameLabel>iframe depth: {depth}</FrameLabel>
          <iframe
            id="form-iframe-1"
            title={`frame ${newDepth}`}
            src={src + `&userInputType=username`}
            style={{ ...iframeStyle, width: "40%", marginRight: "5%" }}
            scrolling="no"
            loading="lazy"
          ></iframe>
          <iframe
            id="form-iframe-2"
            title={`frame ${newDepth}`}
            src={src + `&userInputType=email`}
            style={{ ...iframeStyle, width: "40%" }}
            scrolling="no"
            loading="lazy"
          ></iframe>
        </>
      );
    }

    return (
      <>
        <FrameLabel>iframe depth: {depth}</FrameLabel>
        <iframe
          id="test-iframe"
          title={`frame ${newDepth}`}
          src={src}
          style={iframeStyle}
          loading="lazy"
        ></iframe>
      </>
    );
  }

  return (
    <>
      <FrameLabel>iframe depth: {depth}</FrameLabel>
      <br />
      <NestedForm userInputType={userInputType} />
    </>
  );
}

function NestedForm({
  userInputType,
}: {
  userInputType: "username" | "email";
}) {
  return (
    <>
      <strong>Login with {userInputType}</strong>
      <form className="card__body" method="POST" action="/login">
        {userInputType === "username" ? <UsernameInput /> : <EmailInput />}
        <PasswordInput />
        <SubmitButton label="Submit" />
      </form>
    </>
  );
}

const FrameLabel = styled.div`
  border-bottom: 1px solid #3d3d3d;
  line-height: 2rem;
  font-weight: bold;

  :before {
    display: block;
    margin-top: 10px;
    content: "";
  }
`;
