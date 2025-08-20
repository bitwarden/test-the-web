---
slug: top-layer-popover
title: popover login form
sidebar_label: popover
description: a login form within a top-layer popover that will POST the input values on submit
unlisted: true
---

<script src="/js/popover-login.js" defer="defer"></script>

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <div id="formPopover" popover="manual">
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
          <div class="row margin-bottom--md">
            <label for="password" class="margin-right--sm">Password</label>
            <input
              autocomplete="password"
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
</div>
<hr/>
