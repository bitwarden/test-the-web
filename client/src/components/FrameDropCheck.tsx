import { createElement, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { ICON_START, ICON_STOP, ICON_RESET, ICON_WARNING } from "./constants";

const FILLER_DOM_SIZE = 200_000;
const SHADOW_INITIAL_SPAN_COUNT = 300;
const SHADOW_SPAN_CAP = 310;
const HISTORY_LENGTH = 40;
const FPS_UPDATE_INTERVAL_MS = 250;
const STAGE_HIDDEN_DELTA_MS = 1000;

const STRESS_SHADOW_HOST_TAG = "bit-stress-shadow-host";

const MIN_MUTATION_INTERVAL_MS = 10;
const DEFAULT_MUTATION_INTERVAL_MS = 50;
const MIN_SHADOW_ROOT_BREADTH = 1;
const MAX_SHADOW_ROOT_BREADTH = 20;
const DEFAULT_SHADOW_ROOT_BREADTH = 1;
const MIN_SHADOW_ROOT_DEPTH = 1;
const MAX_SHADOW_ROOT_DEPTH = 10;
const DEFAULT_SHADOW_ROOT_DEPTH = 1;

if (
  typeof window !== "undefined" &&
  !customElements.get(STRESS_SHADOW_HOST_TAG)
) {
  class StressShadowHost extends HTMLElement {
    static get observedAttributes() {
      return ["data-mutating"];
    }

    private mutationIntervalId: number | undefined;
    private mutationCount = 0;
    private shadow: ShadowRoot | null = null;
    private intervalMs = DEFAULT_MUTATION_INTERVAL_MS;

    connectedCallback() {
      const depth = Math.max(
        MIN_SHADOW_ROOT_DEPTH,
        parseInt(this.getAttribute("data-depth") ?? "1", 10) || 1,
      );
      this.intervalMs = Math.max(
        MIN_MUTATION_INTERVAL_MS,
        parseInt(this.getAttribute("data-interval") ?? "50", 10) || 50,
      );
      const mutating = this.getAttribute("data-mutating") === "true";
      this.shadow = this.attachShadow({ mode: "closed" });

      if (depth > 1) {
        const nested = document.createElement(STRESS_SHADOW_HOST_TAG);
        nested.setAttribute("data-depth", String(depth - 1));
        nested.setAttribute("data-interval", String(this.intervalMs));
        nested.setAttribute("data-mutating", String(mutating));
        this.shadow.appendChild(nested);
        return;
      }

      for (let i = 0; i < SHADOW_INITIAL_SPAN_COUNT; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.id = `item ${i}`;
        this.shadow.appendChild(input);
      }

      if (mutating) {
        this.startMutating();
      }
    }

    attributeChangedCallback(
      name: string,
      _oldValue: string | null,
      newValue: string | null,
    ) {
      if (name !== "data-mutating" || !this.shadow) {
        return;
      }

      const nested = this.shadow.querySelector(STRESS_SHADOW_HOST_TAG);
      if (nested) {
        nested.setAttribute("data-mutating", newValue ?? "false");
        return;
      }

      if (newValue === "true") {
        this.startMutating();
      } else {
        this.stopMutating();
      }
    }

    disconnectedCallback() {
      this.stopMutating();
    }

    private startMutating() {
      if (this.mutationIntervalId !== undefined || !this.shadow) {
        return;
      }

      const shadow = this.shadow;
      this.mutationIntervalId = window.setInterval(() => {
        const input = document.createElement("input");
        input.type = "text";
        input.id = `${this.mutationCount++}`;
        shadow.appendChild(input);
        if (shadow.childNodes.length > SHADOW_SPAN_CAP && shadow.firstChild) {
          shadow.removeChild(shadow.firstChild);
        }
        bitStressTotalMutations++;
      }, this.intervalMs);
    }

    private stopMutating() {
      if (this.mutationIntervalId !== undefined) {
        window.clearInterval(this.mutationIntervalId);
        this.mutationIntervalId = undefined;
      }
    }
  }

  customElements.define(STRESS_SHADOW_HOST_TAG, StressShadowHost);
}

interface MetricsState {
  fps: number | null;
  worstFrameMs: number;
  totalMutations: number;
  history: number[];
}

const INITIAL_METRICS: MetricsState = {
  fps: null,
  worstFrameMs: 0,
  totalMutations: 0,
  history: [],
};

// Module-level counter incremented by every leaf shadow host on every
// mutation tick. Read by the MutatingShadowRoots component at the FPS
// update cadence and surfaced as a metric. Assumes one component instance
// per page.
let bitStressTotalMutations = 0;

export function FrameDropCheck() {
  const [mutationIntervalMs, setMutationIntervalMs] = useState(
    DEFAULT_MUTATION_INTERVAL_MS,
  );
  const [shadowRootBreadth, setShadowRootBreadth] = useState(
    DEFAULT_SHADOW_ROOT_BREADTH,
  );
  const [shadowRootDepth, setShadowRootDepth] = useState(
    DEFAULT_SHADOW_ROOT_DEPTH,
  );
  const [mutating, setMutating] = useState(false);
  const [metrics, setMetrics] = useState<MetricsState>(INITIAL_METRICS);

  const fillerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef(0);
  const worstFrameRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const lastUpdateTimeRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const filler = fillerRef.current;
    if (!filler) {
      return;
    }

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < FILLER_DOM_SIZE; i++) {
      fragment.appendChild(document.createElement("div"));
    }
    filler.appendChild(fragment);

    return () => {
      filler.replaceChildren();
    };
  }, []);

  useEffect(() => {
    lastFrameTimeRef.current = performance.now();
    lastUpdateTimeRef.current = performance.now();

    function frame(now: number) {
      const delta = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;
      if (delta < STAGE_HIDDEN_DELTA_MS && delta > worstFrameRef.current) {
        worstFrameRef.current = delta;
      }
      framesRef.current++;

      const elapsedSinceUpdate = now - lastUpdateTimeRef.current;
      if (elapsedSinceUpdate >= FPS_UPDATE_INTERVAL_MS) {
        const fps = Math.round(framesRef.current / (elapsedSinceUpdate / 1000));
        const worst = Math.round(worstFrameRef.current);
        const totalMutations = bitStressTotalMutations;
        setMetrics((previous) => ({
          fps,
          worstFrameMs: worst,
          totalMutations,
          history: [fps, ...previous.history].slice(0, HISTORY_LENGTH),
        }));
        framesRef.current = 0;
        worstFrameRef.current = 0;
        lastUpdateTimeRef.current = now;
      }

      rafIdRef.current = requestAnimationFrame(frame);
    }

    rafIdRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  function startMutating() {
    setMutating(true);
  }

  function stopMutating() {
    setMutating(false);
  }

  function resetMetrics() {
    framesRef.current = 0;
    worstFrameRef.current = 0;
    bitStressTotalMutations = 0;
    setMetrics(INITIAL_METRICS);
  }

  const hosts: React.JSX.Element[] = [];
  const hostKeyPrefix = `${shadowRootBreadth}-${shadowRootDepth}-${mutationIntervalMs}`;
  for (let i = 0; i < shadowRootBreadth; i++) {
    hosts.push(
      createElement(STRESS_SHADOW_HOST_TAG, {
        key: `${hostKeyPrefix}-${i}`,
        "data-depth": shadowRootDepth,
        "data-interval": mutationIntervalMs,
        "data-mutating": mutating ? "true" : "false",
      }),
    );
  }

  return (
    <Container>
      <Warning role="alert">
        <strong>{ICON_WARNING} Caution:</strong> exercising extreme values (very
        high breadth or depth, very short intervals) can potentially crash the
        browser tab.
      </Warning>
      <Description>
        Builds a large baseline DOM ({FILLER_DOM_SIZE.toLocaleString()} nodes)
        and renders closed shadow roots on page load — configured by{" "}
        <strong>breadth</strong> (sibling shadow hosts) and{" "}
        <strong>depth</strong> (nested shadow hosts inside each top-level host).
        The stage below uses{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame"
          target="_blank"
          rel="noopener"
        >
          <code>requestAnimationFrame</code>
        </a>{" "}
        to surface frame drops both numerically (FPS / worst-frame ms) and
        visually (a bouncing ball that visibly stutters when frames are
        dropped).
      </Description>
      <Controls
        mutationIntervalMs={mutationIntervalMs}
        shadowRootBreadth={shadowRootBreadth}
        shadowRootDepth={shadowRootDepth}
        mutating={mutating}
        onMutationIntervalChange={setMutationIntervalMs}
        onShadowRootBreadthChange={setShadowRootBreadth}
        onShadowRootDepthChange={setShadowRootDepth}
        onStartMutating={startMutating}
        onStopMutating={stopMutating}
        onResetMetrics={resetMetrics}
      />
      <hr />
      <Stage>
        <AnimationStage>
          <Ball />
        </AnimationStage>
        <MetricsRow>
          <MetricCard>
            <MetricLabel>Current FPS</MetricLabel>
            <MetricValue tone={fpsTone(metrics.fps)}>
              {metrics.fps ?? "—"}
            </MetricValue>
            <MetricUnit>frames / sec</MetricUnit>
          </MetricCard>
          <MetricCard>
            <MetricLabel>Worst Frame</MetricLabel>
            <MetricValue tone={worstFrameTone(metrics.worstFrameMs)}>
              {metrics.fps === null ? "—" : metrics.worstFrameMs}
            </MetricValue>
            <MetricUnit>ms blocked</MetricUnit>
          </MetricCard>
          <MetricCard>
            <MetricLabel>Mutations</MetricLabel>
            <MetricValue tone="neutral">
              {metrics.totalMutations.toLocaleString()}
            </MetricValue>
            <MetricUnit>total across shadow roots</MetricUnit>
          </MetricCard>
        </MetricsRow>
        <Chart>
          <ChartHeading>Frame history (newest ← left)</ChartHeading>
          <Bars>
            {metrics.history.map((sampleFps, index) => {
              const height = clamp(Math.round((sampleFps / 120) * 60), 4, 60);
              return (
                <BarColumn
                  key={index}
                  style={{
                    height: `${height}px`,
                    background: colorForFps(sampleFps),
                  }}
                />
              );
            })}
          </Bars>
        </Chart>
      </Stage>
      <HiddenHostsContainer>{hosts}</HiddenHostsContainer>
      <FillerContainer ref={fillerRef} aria-hidden="true" />
    </Container>
  );
}

interface ControlsProps {
  mutationIntervalMs: number;
  shadowRootBreadth: number;
  shadowRootDepth: number;
  mutating: boolean;
  onMutationIntervalChange: (value: number) => void;
  onShadowRootBreadthChange: (value: number) => void;
  onShadowRootDepthChange: (value: number) => void;
  onStartMutating: () => void;
  onStopMutating: () => void;
  onResetMetrics: () => void;
}

function Controls({
  mutationIntervalMs,
  shadowRootBreadth,
  shadowRootDepth,
  mutating,
  onMutationIntervalChange,
  onShadowRootBreadthChange,
  onShadowRootDepthChange,
  onStartMutating,
  onStopMutating,
  onResetMetrics,
}: ControlsProps) {
  return (
    <ControlsRow>
      <Field>
        <span>Mutation interval (ms)</span>
        <input
          type="number"
          name="mutationInterval"
          min={MIN_MUTATION_INTERVAL_MS}
          step={10}
          value={mutationIntervalMs}
          onChange={(event) =>
            onMutationIntervalChange(
              Math.max(
                MIN_MUTATION_INTERVAL_MS,
                Number(event.target.value) || DEFAULT_MUTATION_INTERVAL_MS,
              ),
            )
          }
        />
      </Field>
      <Field>
        <span>Shadow root breadth</span>
        <input
          type="number"
          name="shadowRootBreadth"
          min={MIN_SHADOW_ROOT_BREADTH}
          max={MAX_SHADOW_ROOT_BREADTH}
          step={1}
          value={shadowRootBreadth}
          onChange={(event) =>
            onShadowRootBreadthChange(
              clamp(
                Number(event.target.value) || DEFAULT_SHADOW_ROOT_BREADTH,
                MIN_SHADOW_ROOT_BREADTH,
                MAX_SHADOW_ROOT_BREADTH,
              ),
            )
          }
        />
      </Field>
      <Field>
        <span>Shadow root depth</span>
        <input
          type="number"
          name="shadowRootDepth"
          min={MIN_SHADOW_ROOT_DEPTH}
          max={MAX_SHADOW_ROOT_DEPTH}
          step={1}
          value={shadowRootDepth}
          onChange={(event) =>
            onShadowRootDepthChange(
              clamp(
                Number(event.target.value) || DEFAULT_SHADOW_ROOT_DEPTH,
                MIN_SHADOW_ROOT_DEPTH,
                MAX_SHADOW_ROOT_DEPTH,
              ),
            )
          }
        />
      </Field>
      <ButtonGroup>
        <button
          type="button"
          className="button button--primary"
          onClick={onStartMutating}
          disabled={mutating}
        >
          <ButtonIcon>{ICON_START}</ButtonIcon>Start mutations
        </button>
        <button
          type="button"
          className="button button--secondary"
          onClick={onStopMutating}
          disabled={!mutating}
        >
          <ButtonIcon>{ICON_STOP}</ButtonIcon>Stop mutations
        </button>
        <button
          type="button"
          className="button button--danger"
          onClick={onResetMetrics}
        >
          <ResetButtonIcon>{ICON_RESET}</ResetButtonIcon>Reset metrics
        </button>
      </ButtonGroup>
    </ControlsRow>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

type MetricTone = "good" | "warn" | "bad" | "neutral";

function fpsTone(fps: number | null): MetricTone {
  if (fps === null) {
    return "good";
  }
  if (fps >= 100) {
    return "good";
  }
  if (fps >= 60) {
    return "warn";
  }
  return "bad";
}

function worstFrameTone(ms: number): MetricTone {
  if (ms <= 16) {
    return "good";
  }
  if (ms <= 50) {
    return "warn";
  }
  return "bad";
}

function colorForFps(fps: number) {
  if (fps >= 100) {
    return "#4ade80";
  }
  if (fps >= 60) {
    return "#facc15";
  }
  return "#f87171";
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
`;

const Field = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: 6rem;
  }
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  gap: 0.5rem;
`;

const ButtonIcon = styled.span`
  margin-right: 0.4em;
  font-size: 0.85em;
`;

const ResetButtonIcon = styled(ButtonIcon)`
  font-size: 1.3em;
`;

const Stage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border-radius: 12px;
  background: #0f1117;
  padding: 2rem 1.5rem;
  color: #e0e0e0;
`;

const AnimationStage = styled.div`
  position: relative;
  width: 400px;
  max-width: 100%;
  height: 120px;
  overflow: hidden;
  border: 1px solid #2a2d3a;
  border-radius: 12px;
  background: #1a1d27;
`;

const Ball = styled.div`
  position: absolute;
  top: 50%;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f8ef7, #7b5ea7);
  box-shadow: 0 0 20px rgba(79, 142, 247, 0.4);
  transform: translateY(-50%);
  animation: bit-stress-ball-bounce 2s ease-in-out infinite;

  @keyframes bit-stress-ball-bounce {
    0% {
      left: 16px;
    }
    50% {
      left: calc(100% - 64px);
    }
    100% {
      left: 16px;
    }
  }
`;

const MetricsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const MetricCard = styled.div`
  min-width: 140px;
  border: 1px solid #2a2d3a;
  border-radius: 12px;
  background: #1a1d27;
  padding: 1.25rem 1.75rem;
  text-align: center;
`;

const MetricLabel = styled.div`
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const METRIC_TONE_COLORS: Record<MetricTone, string> = {
  good: "#4ade80",
  warn: "#facc15",
  bad: "#f87171",
  neutral: "#e0e0e0",
};

const MetricValue = styled.div<{ tone: MetricTone }>`
  font-size: 40px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  color: ${({ tone }) => METRIC_TONE_COLORS[tone]};
`;

const MetricUnit = styled.div`
  margin-top: 0.25rem;
  color: #555;
  font-size: 14px;
`;

const Chart = styled.div`
  width: 400px;
  max-width: 100%;
  border: 1px solid #2a2d3a;
  border-radius: 12px;
  background: #1a1d27;
  padding: 1rem;
`;

const ChartHeading = styled.h3`
  margin: 0 0 0.75rem;
  color: #666;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Bars = styled.div`
  display: flex;
  overflow: hidden;
  align-items: flex-end;
  gap: 3px;
  height: 60px;
`;

const BarColumn = styled.div`
  flex: 1;
  min-width: 0;
  border-radius: 3px 3px 0 0;
`;

const HiddenHostsContainer = styled.div`
  display: none;
`;

const FillerContainer = styled.div`
  display: none;
`;
