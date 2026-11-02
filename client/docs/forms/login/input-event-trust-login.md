---
slug: input-event-trust-login
title: login with synthetic input event validation
sidebar_label: synthetic event discard
description: This form keeps its own internal state and updates that state only from trusted input events (those with a `event.isTrusted` value of `true`). On a short interval it reconciles each input back to that internal state, so values written to `element.value` without a trusted input event are discarded.
---

<script src="/js/input-event-trust-login.js" defer="defer"></script>

<style>
  .iet-container { font-family: system-ui, sans-serif; }
  .iet-field-row { margin-bottom: 1rem; max-width: 24rem; }
  .iet-field-row label { display: block; margin-bottom: 0.25rem; }
  .iet-field-row input { width: 100%; padding: 0.35rem 0.5rem; }
</style>

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <div class="card__body iet-container">
        <form id="iet-form" method="POST" action="/login">
          <div class="iet-field-row">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" placeholder="e.g. jsmith@example.com" autocomplete="username" />
          </div>
          <div class="iet-field-row">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" autocomplete="current-password" />
          </div>
          <button type="submit" class="button button--primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</div>
<hr/>
