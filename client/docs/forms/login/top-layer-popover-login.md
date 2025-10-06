---
slug: top-layer-popover
title: top-layer popover login form
sidebar_label: top-layer popover
description: a login form that opens within a top-layer popover that will POST the input values on submit
---

<script src="/js/popover-login.js" defer="defer"></script>

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <button
        id="open-popover-button"
        type="button"
        class="button button--primary col col--4"
      >
        Open Login Popover
      </button>
      <div id="formPopover" popover="manual" class="padding--md">
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
          <div class="row margin-bottom--0">
            <button type="submit" class="button button--primary margin-right--sm margin-bottom--sm col col--4">Login</button>
            <button id="close-popover-button" type="button" class="button button--secondary margin-bottom--sm col col--4">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<hr/>
