import CodeBlock from "@theme/CodeBlock";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { STORED_VALUE_KEYS } from "../../../api/constants";

function formatStringifiedValue(stringifiedJSON: string) {
  const decodedString = decodeURIComponent(stringifiedJSON);

  // parse and re-stringify to use stringify's built-in formatting
  return JSON.stringify(JSON.parse(decodedString), null, 2);
}

type StoredValueKey =
  (typeof STORED_VALUE_KEYS)[keyof typeof STORED_VALUE_KEYS];

function StoredValue({
  storeKey,
  title,
}: {
  storeKey: StoredValueKey;
  title: string;
}) {
  const isBrowser = useIsBrowser();
  let requestBodyValue;

  if (isBrowser) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${storeKey}=`))
      ?.split("=")[1];

    if (!cookieValue) {
      return null;
    }

    requestBodyValue = formatStringifiedValue(cookieValue);

    // clear cookie value
    document.cookie = `${storeKey}=; SameSite=Strict; Max-Age=0`;
  }

  return (
    requestBodyValue && (
      <CodeBlock language="json" title={title}>
        {requestBodyValue}
      </CodeBlock>
    )
  );
}

export function StoredRequestBody() {
  return (
    <StoredValue
      storeKey={STORED_VALUE_KEYS.REFERRER_REQUEST_BODY}
      title="Request body:"
    />
  );
}

export function StoredResponseBody() {
  return (
    <StoredValue
      storeKey={STORED_VALUE_KEYS.REQUEST_RESPONSE_BODY}
      title="Response data:"
    />
  );
}
