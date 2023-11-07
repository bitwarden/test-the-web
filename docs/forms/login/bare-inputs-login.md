---
slug: bare-inputs-login
title: login inputs without an enclosing form
sidebar_label: bare inputs login
description: These are bare inputs without an enclosing `<form>` tag that will POST (via `fetch`) the input values on submit and will return with an HTTP response code of `200`
---

<script src="/js/bare-inputs-login.js" defer="defer"></script>

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <div class="card__body bare-inputs-container">
        <input
          type="hidden"
          name="_token"
          value="abcdefghijklmnopqrstuvwxyz1234567890"
        />
        <div class="row margin-bottom--md">
          <label for="username" class="margin-right--sm">Username</label>
          <input
            type="text"
            id="username"
            label="Username"
            name="username"
            placeholder="e.g. jsmith, jsmith@example.com"
            required
          />
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
          <button type="submit" id="bare-inputs-submit" class="button button--primary">Login</button>
        </div>
      </div>
    </div>
  </div>

</div>
<hr/>