---
slug: login-honeypot
title: login form with honeypots
sidebar_label: honeypot login
description: a login form with hidden "honeypot" inputs (for bot detection) that should remain empty - it will POST the input values on submit
as_seen_on: paypal.com
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <form
        class="card__body"
        method="POST"
        action="/login"
      >
        <div class="row margin-bottom--md">
          <label for="username" class="margin-right--sm">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="e.g. jsmith, jsmith@example.com"
            required
          />
        </div>
        <div class="inputs" style="display: none;">
          <input name="honeypotCode" type="text" autocomplete="off" placeholder="Enter code" />
          <input name="honeypotPassword" type="password" autocomplete="off" placeholder="Enter password" />
          <input name="honeypotEmail" type="text" autocomplete="off" placeholder="Enter email" />
        </div>
        <div class="row margin-bottom--md">
          <label for="password" class="margin-right--sm">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <div class="row">
          <button type="submit" class="button button--primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
<hr/>
