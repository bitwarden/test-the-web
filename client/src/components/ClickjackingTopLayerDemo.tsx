import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "@emotion/styled";
import { ICON_START, ICON_STOP, ICON_WARNING } from "./constants";

const DEFAULT_OPACITY = 1;
const DEFAULT_INTERVAL_MS = 400;
const MIN_INTERVAL_MS = 50;
// Margin around the target's bounding rect so the lure comfortably contains
// focus outlines, which sit outside the input border via outline-offset.
const LURE_OVERHANG_PX = 8;

export function ClickjackingTopLayerDemo() {
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY);
  const [lureBlocksPointer, setLureBlocksPointer] = useState(true);
  const [intervalMs, setIntervalMs] = useState(DEFAULT_INTERVAL_MS);
  const [reclaimRunning, setReclaimRunning] = useState(false);
  const [targetClicks, setTargetClicks] = useState(0);
  const [lureClicks, setLureClicks] = useState(0);
  const [flashKey, setFlashKey] = useState(0);

  const lureRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLFormElement>(null);

  const positionLure = useCallback(() => {
    const lure = lureRef.current;
    const target = targetRef.current;

    if (!lure || !target) {
      return;
    }

    const rect = target.getBoundingClientRect();
    lure.style.top = `${rect.top - LURE_OVERHANG_PX}px`;
    lure.style.left = `${rect.left - LURE_OVERHANG_PX}px`;
    lure.style.width = `${rect.width + LURE_OVERHANG_PX * 2}px`;
    lure.style.height = `${rect.height + LURE_OVERHANG_PX * 2}px`;
  }, []);

  const showLure = useCallback(() => {
    const lure = lureRef.current;

    if (!lure) {
      return;
    }

    try {
      if (!lure.matches(":popover-open")) {
        lure.showPopover();
      }
    } catch {
      // showPopover throws if the element is not connected or the API is
      // unsupported; both cases are non-fatal for the demo.
    }

    positionLure();
  }, [positionLure]);

  const reclaimTopLayer = useCallback(() => {
    const lure = lureRef.current;

    if (!lure) {
      return;
    }

    try {
      if (lure.matches(":popover-open")) {
        lure.hidePopover();
      }
      lure.showPopover();
    } catch {
      // Same rationale as showLure above.
    }

    positionLure();
  }, [positionLure]);

  useLayoutEffect(() => {
    showLure();
  }, [showLure]);

  useEffect(() => {
    function reposition() {
      positionLure();
    }

    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);

    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [positionLure]);

  useEffect(() => {
    if (!reclaimRunning) {
      return;
    }

    const id = window.setInterval(
      () => {
        const lure = lureRef.current;

        if (!lure) {
          return;
        }

        try {
          if (lure.matches(":popover-open")) {
            lure.hidePopover();
          }
          lure.showPopover();
        } catch {
          // Non-fatal; same rationale as elsewhere.
        }

        positionLure();
      },
      Math.max(MIN_INTERVAL_MS, intervalMs),
    );

    return () => window.clearInterval(id);
  }, [reclaimRunning, intervalMs, positionLure]);

  function handleTargetClick() {
    setTargetClicks((previous) => previous + 1);
    setFlashKey((previous) => previous + 1);
  }

  function handleLureClick() {
    setLureClicks((previous) => previous + 1);
  }

  return (
    <Container>
      <Warning role="alert">
        <strong>{ICON_WARNING} Educational demo:</strong> the login form below
        is a no-op; its submit handler is suppressed and no values leave the
        page.
      </Warning>
      <Description>
        "Clickjacking" is an attack sometimes leveraged by compromised or
        malicious web pages or scripts. The goal is to get the user to interact
        with the host page in a way they otherwise wouldn't, typically by
        obscuring or masking the interface in some enticing way.
      </Description>
      <Description>
        In the example below, the attacking "lure" (the yellow overlay)
        leverages the{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Glossary/Top_layer"
          target="_blank"
          rel="noopener"
        >
          top layer
        </a>{" "}
        concept, which paints above every other element on the page,{" "}
        <strong>regardless of normal stack order</strong>. The lure additionally
        employs a
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events"
          target="_blank"
          rel="noopener"
        >
          {" "}
          <code>pointer-events: none</code>{" "}
        </a>
        CSS rule, which allows clicks to pass straight through to whatever sits
        underneath (the obscured target).
      </Description>
      <Stage>
        <StageHeading>Try clicking the lure</StageHeading>
        <TargetArea>
          <TargetForm
            ref={targetRef}
            onClick={handleTargetClick}
            onSubmit={(event) => event.preventDefault()}
          >
            <FormRow>
              <FormLabel htmlFor="clickjack-username">Username</FormLabel>
              <TargetInput
                id="clickjack-username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="e.g. jsmith"
                autoFocus
              />
            </FormRow>
            <FormRow>
              <FormLabel htmlFor="clickjack-password">Password</FormLabel>
              <TargetInput
                id="clickjack-password"
                name="password"
                type="password"
                autoComplete="current-password"
              />
            </FormRow>
            <FormSubmit type="submit">Log in</FormSubmit>
          </TargetForm>
          {flashKey > 0 && <TargetFlash key={flashKey} aria-hidden="true" />}
        </TargetArea>
        <CountersRow>
          <Counter>
            Clicks that reached the form:{" "}
            <CounterValue tone="bad">{targetClicks}</CounterValue>
          </Counter>
          <Counter>
            Clicks captured by the lure:{" "}
            <CounterValue tone="good">{lureClicks}</CounterValue>
          </Counter>
        </CountersRow>
      </Stage>
      <Controls
        opacity={opacity}
        lureBlocksPointer={lureBlocksPointer}
        intervalMs={intervalMs}
        reclaimRunning={reclaimRunning}
        onOpacityChange={setOpacity}
        onLureBlocksPointerChange={setLureBlocksPointer}
        onIntervalChange={setIntervalMs}
        onReclaimOnce={reclaimTopLayer}
        onToggleReclaiming={() => setReclaimRunning((previous) => !previous)}
      />
      <Description>
        Using the controls, you can examine how this attack works. A lure is
        typically fully opaque (despite being "hollow" to click actions), but
        you can adjust the opacity using the opacity slider. Additionally, you
        may toggle the
        <code>pointer-events: none</code>
        styling and watch the counters above after clicking to see where events
        ultimately land. Finally, you may use the buttons to simulate a script
        reclaiming the top layer (for example, if another legitimate top-layer
        element appears). This can be done once with the "Reclaim" button, or
        automatically at a specified interval.
      </Description>
      <Description>
        Note that this is not the only method for executing a clickjacking
        attack, and is provided as a non-exhaustive example to defend against.
      </Description>
      <Lure
        ref={lureRef}
        popover="manual"
        onClick={handleLureClick}
        style={{
          opacity,
          pointerEvents: lureBlocksPointer ? "none" : "auto",
        }}
      >
        <LureLabel>Click here, don't worry about it.</LureLabel>
      </Lure>
    </Container>
  );
}

interface ControlsProps {
  opacity: number;
  lureBlocksPointer: boolean;
  intervalMs: number;
  reclaimRunning: boolean;
  onOpacityChange: (value: number) => void;
  onLureBlocksPointerChange: (value: boolean) => void;
  onIntervalChange: (value: number) => void;
  onReclaimOnce: () => void;
  onToggleReclaiming: () => void;
}

function Controls({
  opacity,
  lureBlocksPointer,
  intervalMs,
  reclaimRunning,
  onOpacityChange,
  onLureBlocksPointerChange,
  onIntervalChange,
  onReclaimOnce,
  onToggleReclaiming,
}: ControlsProps) {
  return (
    <>
      <ControlsRow>
        <SliderField>
          <span>Lure opacity</span>
          <input
            type="range"
            name="lureOpacity"
            min={0}
            max={1}
            step={0.05}
            value={opacity}
            onChange={(event) =>
              onOpacityChange(clamp(Number(event.target.value), 0, 1))
            }
          />
          <SliderReadout>{opacity.toFixed(2)}</SliderReadout>
        </SliderField>
        <ToggleField>
          <input
            type="checkbox"
            name="lurePointerEvents"
            checked={lureBlocksPointer}
            onChange={(event) =>
              onLureBlocksPointerChange(event.target.checked)
            }
          />
          <span>
            Lure has <code>pointer-events: none</code>
          </span>
        </ToggleField>
      </ControlsRow>
      <ControlsRow>
        <ButtonGroup>
          <button
            type="button"
            className="button button--secondary"
            onClick={onReclaimOnce}
          >
            Reclaim top layer
          </button>
          <button
            type="button"
            className={
              reclaimRunning
                ? "button button--secondary"
                : "button button--primary"
            }
            onClick={onToggleReclaiming}
            aria-pressed={reclaimRunning}
          >
            <ButtonIcon>{reclaimRunning ? ICON_STOP : ICON_START}</ButtonIcon>
            {reclaimRunning
              ? "Stop reclaim interval"
              : "Start reclaim interval"}
          </button>
        </ButtonGroup>
        <Field>
          <span>Reclaim interval (ms)</span>
          <input
            type="number"
            name="reclaimInterval"
            min={MIN_INTERVAL_MS}
            step={10}
            value={intervalMs}
            onChange={(event) =>
              onIntervalChange(
                Math.max(
                  MIN_INTERVAL_MS,
                  Number(event.target.value) || DEFAULT_INTERVAL_MS,
                ),
              )
            }
          />
        </Field>
      </ControlsRow>
    </>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const Container = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  margin: 0;
`;

const Warning = styled.div`
  border-left: 4px solid var(--ifm-color-warning);
  border-radius: var(--ifm-card-border-radius, 0.25rem);
  background: var(--ifm-color-warning-contrast-background);
  padding: 0.75rem 1rem;
  color: var(--ifm-color-warning-contrast-foreground);
`;

const ControlsRow = styled.div`
  gap: 0.5rem 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Field = styled.label`
  gap: 0.5rem;
  display: inline-flex;
  align-items: center;

  input {
    width: 6rem;
  }
`;

const SliderField = styled.label`
  gap: 0.5rem;
  display: inline-flex;
  align-items: center;

  input {
    width: 10rem;
  }
`;

const SliderReadout = styled.span`
  font-variant-numeric: tabular-nums;
  min-width: 2.5rem;
`;

const ToggleField = styled.label`
  gap: 0.4rem;
  display: inline-flex;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ButtonIcon = styled.span`
  margin-right: 0.4em;
  font-size: 0.85em;
`;

const Stage = styled.div`
  gap: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 12px;
  background: #0f1117;
  padding: 1.5rem;
  color: #e0e0e0;
`;

const StageHeading = styled.h3`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #b0b6c4;
  font-size: 0.85rem;
  font-weight: 600;
`;

const TargetArea = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  padding: 2rem 0;
`;

const TargetForm = styled.form`
  gap: 0.75rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 22rem;
`;

const FormRow = styled.div`
  gap: 0.25rem;
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  color: #b0b6c4;
  font-size: 0.8rem;
  font-weight: 600;
`;

const TargetInput = styled.input`
  border: 1px solid #2a2d3a;
  border-radius: 6px;
  background: #1a1d27;
  padding: 0.5rem 0.75rem;
  color: #e0e0e0;
  font-size: 0.95rem;

  &::placeholder {
    color: #5a6172;
  }

  &:focus-visible {
    outline: 2px solid #f87171;
    outline-offset: 2px;
  }
`;

const FormSubmit = styled.button`
  align-self: flex-start;
  border: 1px solid #f87171;
  border-radius: 6px;
  background: #2a0d0d;
  cursor: pointer;
  padding: 0.5rem 1.25rem;
  color: #fecaca;
  font-size: 0.95rem;
  font-weight: 600;

  &:hover {
    background: #3a1414;
  }
`;

const TargetFlash = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid #fbbf24;
  border-radius: 12px;
  width: 240px;
  height: 80px;
  animation: bit-clickjack-flash 600ms ease-out forwards;
  pointer-events: none;

  @keyframes bit-clickjack-flash {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.6);
      opacity: 0;
    }
  }
`;

const CountersRow = styled.div`
  gap: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Counter = styled.div`
  font-size: 0.95rem;
`;

type CounterTone = "good" | "bad";

const COUNTER_TONE_COLORS: Record<CounterTone, string> = {
  good: "#4ade80",
  bad: "#f87171",
};

const CounterValue = styled.strong<{ tone: CounterTone }>`
  font-variant-numeric: tabular-nums;
  margin-left: 0.25rem;
  color: ${({ tone }) => COUNTER_TONE_COLORS[tone]};
  font-size: 1.1rem;
`;

// `position: fixed` overrides the popover UA default of margin: auto
// centering; we set top/left/width/height directly via positionLure().
// Inline styles are applied for opacity and pointer-events so they can be
// driven by the controls without restyling the stylesheet.
const Lure = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  margin: 0;
  border: 2px solid #f59e0b;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  cursor: pointer;
  padding: 0;
  color: #1f2937;
  font-weight: 700;
`;

const LureLabel = styled.span`
  padding: 0.5rem 1rem;
  text-align: center;
`;
