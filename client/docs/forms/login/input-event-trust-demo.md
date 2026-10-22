---
slug: input-event-trust-demo
title: trusted vs synthetic input events
sidebar_label: input event trust
description: a login form that logs every input event with its isTrusted flag; buttons apply different value-setting strategies so you can observe which produce trusted events and which do not
---

<script src="/js/input-event-trust-demo.js" defer="defer"></script>

<style>
  .iet-container { font-family: system-ui, sans-serif; }
  .iet-instructions { margin-bottom: 1.5rem; }
  .iet-instructions p { margin: 0.4rem 0; }
  .iet-section { margin-bottom: 1.5rem; }
  .iet-section h3 { margin: 0 0 0.5rem 0; font-size: 1rem; }
  .iet-field-row { display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1rem; flex-wrap: wrap; }
  .iet-field-col { flex: 0 0 auto; min-width: 18rem; }
  .iet-log-col { flex: 1 1 24rem; min-width: 20rem; }
  .iet-log {
    list-style: none;
    margin: 0;
    padding: 0;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.75rem;
    border: 1px solid var(--ifm-color-emphasis-300);
    border-radius: 4px;
    background: var(--ifm-background-surface-color);
    min-height: 2rem;
    max-height: 15rem;
    overflow-y: auto;
  }
  .iet-log-row {
    padding: 0.25rem 0.5rem;
    border-bottom: 1px solid var(--ifm-color-emphasis-200);
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    color: #000;
  }
  .iet-log-row:last-child { border-bottom: none; }
  .iet-log-row--trusted { background: #b9f0c0; }
  .iet-log-row--synthetic { background: #f5b4b4; }
  .iet-log-time { color: #444; min-width: 6rem; }
  .iet-log-type { font-weight: 600; min-width: 6rem; }
  .iet-log-trusted { min-width: 10rem; }
  .iet-strategies { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .iet-strategies button { flex: 0 0 auto; }
  .iet-output {
    background: var(--ifm-background-surface-color);
    border: 1px solid var(--ifm-color-emphasis-300);
    border-radius: 4px;
    padding: 0.75rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.8rem;
    white-space: pre-wrap;
    min-height: 3rem;
  }
  .iet-field-col label { display: block; margin-bottom: 0.25rem; }
  .iet-field-col input { width: 100%; padding: 0.35rem 0.5rem; }
</style>

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md iet-container">
      <div class="card__body">

<div class="iet-instructions">
  <p><strong>What this page shows.</strong> Type manually into either field, or click a strategy button to set its value from JavaScript. Each event fired on the input is logged next to it, color-coded by <code>event.isTrusted</code>.</p>
  <p><strong>Green rows</strong> are trusted events — either real user input, or events synthesized by the browser's own editing engine (e.g. <code>execCommand</code>). <strong>Red rows</strong> are synthetic — events constructed and dispatched from JavaScript. Any code consuming the input is free to treat the two kinds differently.</p>
  <p><strong>Watch what the submit capture shows:</strong> the DOM value, and what a submit handler sees when reading <code>element.value</code>. The two can disagree depending on how the value was set and what other code is observing the input.</p>
  <p><strong>Strategy #1 (direct assignment) is expected to produce no events at all</strong> — that empty log <em>is</em> the signal. Assigning to <code>element.value</code> mutates the DOM silently without dispatching anything.</p>
</div>

<form id="iet-form" class="iet-section" method="POST" action="#">
  <div class="iet-field-row">
    <div class="iet-field-col">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="e.g. jsmith@example.com"
        autocomplete="username"
      />
    </div>
    <div class="iet-log-col">
      <h3>events on username</h3>
      <ul id="iet-log-username" class="iet-log" aria-live="polite"></ul>
    </div>
  </div>

  <div class="iet-field-row">
    <div class="iet-field-col">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        autocomplete="current-password"
      />
    </div>
    <div class="iet-log-col">
      <h3>events on password</h3>
      <ul id="iet-log-password" class="iet-log" aria-live="polite"></ul>
    </div>
  </div>

  <div class="iet-section">
    <button type="submit" class="button button--primary">Submit</button>
    <button type="button" id="iet-reset" class="button button--secondary margin-left--sm">Reset fields and logs</button>
  </div>
</form>

<div class="iet-section">
  <h3>Fill strategies</h3>
  <p>Each button fills both fields (<code>user@example.com</code> / <code>password123</code>) using the labeled strategy, so you can compare which events fire and their <code>isTrusted</code> flag.</p>
  <div class="iet-strategies">
    <button type="button" class="button button--outline button--primary" data-iet-strategy="direct-assignment">
      1. Direct assignment (<code>element.value = x</code>)
    </button>
    <button type="button" class="button button--outline button--primary" data-iet-strategy="assignment-plain-event">
      2. Assignment + plain <code>Event('input')</code>
    </button>
    <button type="button" class="button button--outline button--primary" data-iet-strategy="assignment-input-event">
      3. Assignment + <code>InputEvent('input')</code>
    </button>
    <button type="button" class="button button--outline button--primary" data-iet-strategy="native-setter-input-event">
      4. Native setter + <code>InputEvent('input')</code>
    </button>
    <button type="button" class="button button--outline button--primary" data-iet-strategy="exec-command-insert-text">
      5. <code>execCommand('insertText')</code>
    </button>
  </div>
</div>

<div class="iet-section">
  <h3>Captured on submit</h3>
  <div id="iet-output" class="iet-output"></div>
</div>
      </div>
    </div>
  </div>
</div>
<hr/>
