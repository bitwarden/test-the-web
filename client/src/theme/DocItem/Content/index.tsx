/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { DocFrontMatter } from "@docusaurus/plugin-content-docs";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import Heading from "@theme/Heading";
import MDXContent from "@theme/MDXContent";
import type { Props } from "@theme/DocItem/Content";

/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle(): string | null {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === "undefined";
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

type ExtendedDocFrontMatter = DocFrontMatter & { as_seen_on: string };

export default function DocItemContent({ children }: Props): JSX.Element {
  const syntheticTitle = useSyntheticTitle();
  const { metadata, frontMatter } = useDoc();
  const docDescription = metadata.description;
  const { as_seen_on: asSeenOn } = frontMatter as ExtendedDocFrontMatter;

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, "markdown")}>
      {syntheticTitle && (
        <header>
          {docDescription ? (
            <>
              <Heading as="h1">{syntheticTitle}</Heading>
              <br />
              {asSeenOn && (
                <>
                  <small>
                    <em>(As seen on {asSeenOn})</em>
                  </small>
                  <br />
                  <br />
                </>
              )}
              <div>{metadata.description}</div>
            </>
          ) : (
            <Heading as="h1">{syntheticTitle}</Heading>
          )}
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
