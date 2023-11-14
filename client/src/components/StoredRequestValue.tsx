import CodeBlock from "@theme/CodeBlock";
import useIsBrowser from "@docusaurus/useIsBrowser";

function formatStringifiedValue(stringifiedJSON: string) {
  const decodedString = decodeURIComponent(stringifiedJSON);

  // parse and re-stringify to use stringify's built-in formatting
  return JSON.stringify(JSON.parse(decodedString), null, 2);
}

export function StoredRequestValue() {
  const isBrowser = useIsBrowser();
  let requestBodyValue;

  if (isBrowser) {
    const cookieKey = "referrerRequestBody";
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${cookieKey}=`))
      ?.split("=")[1];

    if (!cookieValue) {
      return null;
    }

    requestBodyValue = formatStringifiedValue(cookieValue);

    // clear cookie value
    document.cookie = `${cookieKey}=; SameSite=Strict; Max-Age=0`;
  }

  return (
    <CodeBlock language="json" title="Request body:" className="margin-top--md">
      {requestBodyValue}
    </CodeBlock>
  );
}
