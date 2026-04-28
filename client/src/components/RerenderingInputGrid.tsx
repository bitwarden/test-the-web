import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

const MIN_COUNT = 25;
const INFINITE_SCROLL_STEP = 50;
const INFINITE_SCROLL_THRESHOLD_PX = 8;
const INFINITE_SCROLL_LOCK_MS = 250;
const ELAPSED_POLL_MS = 250;
const MB = 1048576;

interface MetricsState {
  heap: string;
  heapDeltaMb: number | null;
  nodes: number;
  renderMs: number;
  longestRenderMs: number;
  longTasks: number;
}

const INITIAL_METRICS: MetricsState = {
  heap: "N/A",
  heapDeltaMb: null,
  nodes: 0,
  renderMs: 0,
  longestRenderMs: 0,
  longTasks: 0,
};

// Unicode symbols + VS-15 (U+FE0E) to force text presentation rather than
// the platform-dependent emoji rendering.
const ICON_START = "▶︎";
const ICON_STOP = "⏹︎";
const ICON_RESET = "↻";
const ICON_WARNING = "⚠︎";

export function RerenderingInputGrid() {
  const [count, setCount] = useState(150);
  const [intervalMs, setIntervalMs] = useState(1000);
  const [running, setRunning] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [metrics, setMetrics] = useState<MetricsState>(INITIAL_METRICS);

  const startedAtRef = useRef<number | null>(null);
  const baselineHeapRef = useRef<number | null>(null);
  const longTaskCountRef = useRef(0);
  const renderStartRef = useRef(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    if (typeof PerformanceObserver === "undefined") {
      return;
    }

    let observer: PerformanceObserver | undefined;

    try {
      observer = new PerformanceObserver((list) => {
        longTaskCountRef.current += list.getEntries().length;
      });
      observer.observe({ entryTypes: ["longtask"] });
    } catch {
      // `longtask` entry type unsupported in this browser
    }

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (!running) {
      return;
    }

    if (startedAtRef.current === null) {
      startedAtRef.current = Date.now();
    }

    const id = window.setInterval(
      () => {
        renderStartRef.current = performance.now();
        setTickCount((previousTickCount) => previousTickCount + 1);
      },
      Math.max(50, intervalMs),
    );

    return () => window.clearInterval(id);
  }, [running, intervalMs]);

  useEffect(() => {
    if (!running) {
      return;
    }

    const id = window.setInterval(() => {
      if (startedAtRef.current !== null) {
        setElapsed(Math.round((Date.now() - startedAtRef.current) / 1000));
      }
    }, ELAPSED_POLL_MS);

    return () => window.clearInterval(id);
  }, [running]);

  useLayoutEffect(() => {
    if (renderStartRef.current === 0) {
      return;
    }

    const renderMs = performance.now() - renderStartRef.current;
    const memory = (
      performance as unknown as { memory?: { usedJSHeapSize: number } }
    ).memory;

    let heap = "N/A";
    let heapDeltaMb: number | null = null;

    if (memory) {
      const used = memory.usedJSHeapSize;

      if (baselineHeapRef.current === null) {
        baselineHeapRef.current = used;
      }

      heap = `${(used / MB).toFixed(1)} MB`;
      heapDeltaMb = (used - baselineHeapRef.current) / MB;
    }

    setMetrics((previousMetrics) => ({
      heap,
      heapDeltaMb,
      nodes: document.getElementsByTagName("*").length,
      renderMs,
      longestRenderMs: Math.max(previousMetrics.longestRenderMs, renderMs),
      longTasks: longTaskCountRef.current,
    }));

    // Disarm so non-tick re-renders (manual count edits, infinite-scroll
    // count bumps) don't get measured against this tick's start timestamp.
    renderStartRef.current = 0;
  }, [tickCount, count]);

  useEffect(() => {
    const element = scrollerRef.current;

    if (!element) {
      return;
    }

    function onScroll() {
      if (loadingMoreRef.current || !element) {
        return;
      }

      if (element.scrollHeight <= element.clientHeight) {
        return;
      }

      const remaining =
        element.scrollHeight - element.scrollTop - element.clientHeight;

      if (remaining <= INFINITE_SCROLL_THRESHOLD_PX) {
        loadingMoreRef.current = true;
        setCount((previousCount) => previousCount + INFINITE_SCROLL_STEP);
        window.setTimeout(() => {
          loadingMoreRef.current = false;
        }, INFINITE_SCROLL_LOCK_MS);
      }
    }
    element.addEventListener("scroll", onScroll);
    return () => element.removeEventListener("scroll", onScroll);
  }, []);

  function start() {
    if (running) {
      return;
    }
    if (tickCount === 0) {
      // Render an initial tick immediately so the grid appears before the
      // first interval fires.
      renderStartRef.current = performance.now();
      setTickCount(1);
    }
    setRunning(true);
  }

  function stop() {
    setRunning(false);
  }

  function reset() {
    stop();
    setTickCount(0);
    setElapsed(0);
    startedAtRef.current = null;
    baselineHeapRef.current = null;
    longTaskCountRef.current = 0;
    // Disarm the post-render measurement; otherwise the useLayoutEffect that
    // depends on [tickCount, count] would fire on the 0-tickCount re-render
    // and overwrite INITIAL_METRICS with a freshly-sampled set.
    renderStartRef.current = 0;
    setMetrics(INITIAL_METRICS);
  }

  return (
    <Container>
      <Warning role="alert">
        <strong>{ICON_WARNING} Caution:</strong> exercising extreme values (very
        large row counts and/or very short intervals) can potentially crash the
        browser tab.
      </Warning>
      <Description>
        Use the controls to simulate streaming data concerns driving lifecycle
        side-effects. Metrics are reported via{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver"
          target="_blank"
          rel="noopener"
        >
          <code>PerformanceObserver</code>
        </a>{" "}
        API.
      </Description>
      <Controls
        count={count}
        intervalMs={intervalMs}
        running={running}
        onCountChange={setCount}
        onIntervalChange={setIntervalMs}
        onStart={start}
        onStop={stop}
        onReset={reset}
      />
      <hr />
      <Metrics ticks={tickCount} elapsed={elapsed} metrics={metrics} />
      <Grid count={count} tickCount={tickCount} scrollerRef={scrollerRef} />
    </Container>
  );
}

interface ControlsProps {
  count: number;
  intervalMs: number;
  running: boolean;
  onCountChange: (n: number) => void;
  onIntervalChange: (n: number) => void;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

function Controls({
  count,
  intervalMs,
  running,
  onCountChange,
  onIntervalChange,
  onStart,
  onStop,
  onReset,
}: ControlsProps) {
  return (
    <ControlsRow>
      <Field>
        <span>Row count</span>
        <input
          type="number"
          name="rerenderCount"
          min={MIN_COUNT}
          step={50}
          value={count}
          onChange={(e) =>
            onCountChange(
              Math.max(MIN_COUNT, Number(e.target.value) || MIN_COUNT),
            )
          }
        />
      </Field>
      <Field>
        <span>Interval (ms)</span>
        <input
          type="number"
          name="rerenderInterval"
          min={50}
          step={50}
          value={intervalMs}
          onChange={(e) =>
            onIntervalChange(Math.max(50, Number(e.target.value) || 1000))
          }
        />
      </Field>
      <ButtonGroup>
        <button
          type="button"
          className="button button--primary"
          onClick={onStart}
          disabled={running}
        >
          <ButtonIcon>{ICON_START}</ButtonIcon>Start
        </button>
        <button
          type="button"
          className="button button--secondary"
          onClick={onStop}
          disabled={!running}
        >
          <ButtonIcon>{ICON_STOP}</ButtonIcon>Stop
        </button>
        <button
          type="button"
          className="button button--danger"
          onClick={onReset}
        >
          <ResetButtonIcon>{ICON_RESET}</ResetButtonIcon>Reset
        </button>
      </ButtonGroup>
    </ControlsRow>
  );
}

interface MetricsProps {
  ticks: number;
  elapsed: number;
  metrics: MetricsState;
}

function Metrics({ ticks, elapsed, metrics }: MetricsProps) {
  return (
    <MetricsRow>
      <span>
        Ticks: <strong>{ticks}</strong>
      </span>
      <span>
        Elapsed: <strong>{elapsed}s</strong>
      </span>
      <span>
        Heap: <strong>{metrics.heap}</strong>
      </span>
      <span>
        Heap &Delta;: <HeapDelta value={metrics.heapDeltaMb} />
      </span>
      <span>
        DOM nodes: <strong>{metrics.nodes}</strong>
      </span>
      <span>
        Last render: <strong>{metrics.renderMs.toFixed(1)} ms</strong>
      </span>
      <span>
        Longest render: <strong>{metrics.longestRenderMs.toFixed(1)} ms</strong>
      </span>
      <span>
        Long tasks: <strong>{metrics.longTasks}</strong>
      </span>
    </MetricsRow>
  );
}

interface GridProps {
  count: number;
  tickCount: number;
  scrollerRef: RefObject<HTMLDivElement>;
}

function Grid({ count, tickCount, scrollerRef }: GridProps) {
  const rows: React.JSX.Element[] = [];

  if (tickCount === 0) {
    rows.push(
      <tr key="placeholder">
        <PlaceholderCell colSpan={8}>
          Click "Start" to populate data.
        </PlaceholderCell>
      </tr>,
    );
  } else {
    for (let i = 0; i < count; i++) {
      rows.push(<GridRow key={`${tickCount}-${i}`} index={i} />);
    }
  }

  return (
    <Scroller ref={scrollerRef}>
      <Table>
        <thead>
          <tr>
            <StickyTableHeader>ID</StickyTableHeader>
            <StickyTableHeader>Email</StickyTableHeader>
            <StickyTableHeader>Username</StickyTableHeader>
            <StickyTableHeader>First name</StickyTableHeader>
            <StickyTableHeader>Last name</StickyTableHeader>
            <StickyTableHeader>Phone</StickyTableHeader>
            <StickyTableHeader>Location</StickyTableHeader>
            <StickyTableHeader>Notes</StickyTableHeader>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Scroller>
  );
}

function HeapDelta({ value }: { value: number | null }) {
  if (value === null) {
    return <strong>N/A</strong>;
  }

  const formatted = `${value.toFixed(1)} MB`;

  if (value > 0) {
    return <DeltaPositive>+{formatted}</DeltaPositive>;
  }

  if (value < 0) {
    return <DeltaNegative>{formatted}</DeltaNegative>;
  }

  return <strong>{formatted}</strong>;
}

function GridRow({ index }: { index: number }) {
  return (
    <tr>
      <Cell>{index + 1}</Cell>
      <Cell>
        <RowInput
          type="email"
          id={`email-${index}`}
          name={`email-${index}`}
          autoComplete="email"
        />
      </Cell>
      <Cell>
        <RowInput
          type="text"
          id={`username-${index}`}
          name={`username-${index}`}
          autoComplete="username"
        />
      </Cell>
      <Cell>
        <RowInput
          type="text"
          id={`given-name-${index}`}
          name={`given-name-${index}`}
          autoComplete="given-name"
        />
      </Cell>
      <Cell>
        <RowInput
          type="text"
          id={`family-name-${index}`}
          name={`family-name-${index}`}
          autoComplete="family-name"
        />
      </Cell>
      <Cell>
        <RowInput
          type="tel"
          id={`tel-${index}`}
          name={`tel-${index}`}
          autoComplete="tel"
        />
      </Cell>
      <Cell>
        <RowInput
          type="text"
          id={`location-${index}`}
          name={`location-${index}`}
          autoComplete="address-level2"
        />
      </Cell>
      <Cell>
        <RowInput
          type="text"
          id={`notes-${index}`}
          name={`notes-${index}`}
          autoComplete="off"
        />
      </Cell>
    </tr>
  );
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

const DeltaPositive = styled.strong`
  color: var(--ifm-color-danger);
`;

const DeltaNegative = styled.strong`
  color: var(--ifm-color-success);
`;

const MetricsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0;

  & > span:not(:first-of-type)::before {
    margin: 0 0.75rem;
    color: var(--ifm-color-emphasis-400);
    content: "|";
  }
`;

const Scroller = styled.div`
  max-height: 75vh;
  overflow: auto;
`;

const Table = styled.table`
  display: table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const StickyTableHeader = styled.th`
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid var(--ifm-color-emphasis-300);
  background: var(--ifm-card-background-color);
  padding: 0.25rem 0.5rem;
  text-align: left;
`;

const Cell = styled.td`
  padding: 0.15rem 0.5rem;
`;

const PlaceholderCell = styled.td`
  padding: 0.75rem 0.5rem;
  text-align: center;
  color: var(--ifm-color-emphasis-600);
  font-style: italic;
`;

const RowInput = styled.input`
  width: 100%;
`;
