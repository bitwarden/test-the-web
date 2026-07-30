import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/**
 * A login form inside a focus-trapping ARIA modal (`role="dialog" aria-modal="true"`,
 * not a native `<dialog>`).
 */
export function AriaModalFocusTrapLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  function openModal() {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let focusReturnScheduled = false;
    let focusReturnTimeoutId: number | undefined;

    function getFocusableElements() {
      const modal = modalRef.current;

      if (!modal) {
        return [];
      }

      return Array.from(
        modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => {
        return element.offsetParent !== null;
      });
    }

    function isFocusOnElementOutsideModal() {
      const modal = modalRef.current;
      const activeElement = document.activeElement;

      if (!modal || !activeElement || activeElement === document.body) {
        return false;
      }

      return !modal.contains(activeElement);
    }

    function returnFocusToModal() {
      const focusableElements = getFocusableElements();

      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    function handleFocusOut() {
      if (focusReturnScheduled) {
        return;
      }

      focusReturnScheduled = true;
      focusReturnTimeoutId = window.setTimeout(() => {
        focusReturnScheduled = false;
        if (isFocusOnElementOutsideModal()) {
          returnFocusToModal();
        }
      }, 0);
    }

    // Keep tab cycling within the modal, and close on Escape.
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("focusout", handleFocusOut, true);
    document.addEventListener("keydown", handleKeydown, true);

    return () => {
      document.removeEventListener("focusout", handleFocusOut, true);
      document.removeEventListener("keydown", handleKeydown, true);
      if (focusReturnTimeoutId !== undefined) {
        window.clearTimeout(focusReturnTimeoutId);
      }
      if (lastFocusedRef.current) {
        lastFocusedRef.current.focus();
      }
    };
  }, [isOpen]);

  return (
    <div>
      <button
        type="button"
        className="button button--primary col col--4"
        onClick={openModal}
      >
        Sign in
      </button>
      {isOpen && (
        <ModalBackdrop>
          <div
            ref={modalRef}
            className="card padding--md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="loginModalTitle"
            style={{ width: "min(90vw, 22rem)" }}
          >
            <h2 id="loginModalTitle">Sign in</h2>
            <form className="card__body" method="POST" action="/login">
              <div className="row margin-bottom--md">
                <label htmlFor="username" className="margin-right--sm">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="e.g. jsmith, jsmith@example.com"
                  required
                />
              </div>
              <div className="row margin-bottom--md">
                <label htmlFor="password" className="margin-right--sm">
                  Password
                </label>
                <input
                  autoComplete="current-password"
                  type="password"
                  id="password"
                  name="password"
                  required
                />
              </div>
              <div className="row margin-bottom--0">
                <button
                  type="submit"
                  className="button button--primary margin-right--sm margin-bottom--sm col col--4"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="button button--secondary margin-bottom--sm col col--4"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </ModalBackdrop>
      )}
    </div>
  );
}

const ModalBackdrop = styled.div`
  inset: 0;
  place-items: center;
  display: grid;
  position: fixed;
  z-index: var(--ifm-z-index-overlay);
  background: rgba(0, 0, 0, 0.5);
`;
