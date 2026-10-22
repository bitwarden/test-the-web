---
slug: input-event-trust-demo
title: login form that discards synthetic input
sidebar_label: discards synthetic input
description: a login form whose internal state updates only on trusted input events; on a short interval, DOM values written without a trusted event are reconciled back to the internal state
---

<script src="/js/input-event-trust-demo.js" defer="defer"></script>

<style>
  .iet-container { font-family: system-ui, sans-serif; }
  .iet-container p { margin-bottom: 0.75rem; }
  .iet-field-row { margin-bottom: 1rem; max-width: 24rem; }
  .iet-field-row label { display: block; margin-bottom: 0.25rem; }
  .iet-field-row input { width: 100%; padding: 0.35rem 0.5rem; }
  .iet-output {
    background: var(--ifm-background-surface-color);
    border: 1px solid var(--ifm-color-emphasis-300);
    border-radius: 4px;
    padding: 0.75rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.8rem;
    white-space: pre-wrap;
    min-height: 3rem;
    margin-top: 1rem;
  }
</style>

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <div class="card__body iet-container">
        <p>This form keeps its own internal state and updates that state only from input events with <code>event.isTrusted === true</code>. On a short interval it reconciles each input back to that internal state, so values written to <code>element.value</code> without a trusted input event are discarded.</p>
        <p>On submit, the output below shows the form's captured state alongside the current DOM values.</p>
        <form id="iet-form" method="POST" action="#">
          <div class="iet-field-row">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" placeholder="e.g. jsmith@example.com" autocomplete="username" />
          </div>
          <div class="iet-field-row">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" autocomplete="current-password" />
          </div>
          <button type="submit" class="button button--primary">Submit</button>
        </form>
        <div id="iet-output" class="iet-output"></div>
      </div>
    </div>
  </div>
</div>
<hr/>
