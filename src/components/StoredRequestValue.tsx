import BrowserOnly from '@docusaurus/BrowserOnly';
import CodeBlock from '@theme/CodeBlock';

function formatStringifiedValue(stringifiedJSON) {
  const decodedString = decodeURIComponent(stringifiedJSON);

  // parse and re-stringify to use stringify's built-in formatting
  return JSON.stringify(JSON.parse(decodedString), null, 2);
}

export function StoredRequestValue() {
  return (
    <BrowserOnly>
      {() => {
        const cookieKey = 'referrerRequestBody';
        const cookieValue = document.cookie
          .split('; ')
          .find((row) => row.startsWith(`${cookieKey}=`))
          ?.split('=')[1];

        if (!cookieValue) {
          return null;
        }

        const requestBodyValue = formatStringifiedValue(cookieValue);

        // clear cookie value
        document.cookie = `${cookieKey}=; Max-Age=0`;

        return (
          <>
            <CodeBlock language="json" title="Request body:" className="margin-top--md">
              {requestBodyValue}
            </CodeBlock>
          </>
        );
      }}
    </BrowserOnly>
  );
}
