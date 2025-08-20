---
slug: top-layer-dialog
title: dialog login form
sidebar_label: dialog
description: a login form within a top-layer dialog that will POST the input values on submit
unlisted: true
---

<script src="/js/dialog-login.js" defer="defer"></script>

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <dialog id="formDialog" role="dialog">
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
      </dialog>
    </div>
  </div>
</div>
<hr/>
