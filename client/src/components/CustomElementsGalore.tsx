import { useEffect, useRef } from "react";

/**
 * Synthetic stress test for the autofill content script's shadow-DOM probing.
 *
 * The page registers a handful of custom-element classes, most of which never
 * attach a shadow root. A small fraction attach open shadow roots, and an even
 * smaller fraction attach closed shadow roots. 500 instances are rendered, plus
 * 50 plain <div> elements to keep the candidate set realistic for selectors
 * like ":defined" and "*".
 *
 * Goal: maximize the gap between "elements the probe scans" and "elements that
 * actually carry shadow roots" — exposing whichever code path dominates the cost.
 */

const PLAIN_TAGS = [
  "galore-plain-0",
  "galore-plain-1",
  "galore-plain-2",
  "galore-plain-3",
  "galore-plain-4",
  "galore-plain-5",
  "galore-plain-6",
  "galore-plain-7",
];
const OPEN_TAG = "galore-open-shadow";
const CLOSED_TAG = "galore-closed-shadow";

const TOTAL_CUSTOM_ELEMENTS = 500;
const DIV_COUNT = 50;

let elementsRegistered = false;

function registerCustomElements() {
  if (elementsRegistered) {
    return;
  }
  elementsRegistered = true;

  for (const tag of PLAIN_TAGS) {
    customElements.define(tag, class extends HTMLElement {});
  }

  customElements.define(
    OPEN_TAG,
    class extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.append(document.createTextNode("open root"));
      }
    },
  );

  customElements.define(
    CLOSED_TAG,
    class extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: "closed" });
        shadow.append(document.createTextNode("closed root"));
      }
    },
  );
}

// Deterministic distribution: closed at every 100th (offset 50), open at every
// 25th not-already-closed, plain otherwise. Yields 5 closed + 15 open + 480
// plain = 500 custom elements.
function pickTag(index: number): string {
  if (index % 100 === 50) {
    return CLOSED_TAG;
  }
  if (index % 25 === 0) {
    return OPEN_TAG;
  }
  return PLAIN_TAGS[index % PLAIN_TAGS.length];
}

export function CustomElementsGalore() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerCustomElements();

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < TOTAL_CUSTOM_ELEMENTS; i++) {
      fragment.appendChild(document.createElement(pickTag(i)));
    }

    for (let i = 0; i < DIV_COUNT; i++) {
      const div = document.createElement("div");
      div.textContent = `div-${i}`;
      fragment.appendChild(div);
    }

    container.appendChild(fragment);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <section>
      <p>
        Rendering {TOTAL_CUSTOM_ELEMENTS} custom elements (5 with closed shadow
        roots, 15 with open shadow roots, the rest with no shadow root) plus{" "}
        {DIV_COUNT} <code>&lt;div&gt;</code> elements.
      </p>
      <div ref={containerRef} />
    </section>
  );
}
