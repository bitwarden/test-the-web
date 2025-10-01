---
slug: top-layer-dialog
title: top-layer dialog login form
sidebar_label: top-layer dialog
description: a login form within a top-layer dialog (with a styled `::backdrop` pseudo-element) that will POST the input values on submit
---

<script src="/js/dialog-login.js" defer="defer"></script>

<style>
  ::backdrop {
    background: rgba(59, 139, 165, 0.3);
  }
</style>
<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <button
        id="open-dialog-button"
        type="button"
        class="button button--primary col col--4"
      >
        Open Login Dialog
      </button>
      <dialog id="formDialog" closedby="any">
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
              autofocus
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
            <button type="submit" class="button button--primary margin-right--sm margin-bottom--sm col col--4">Login</button>
            <button id="close-dialog-button" type="button" class="button button--secondary margin-bottom--sm col col--4">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  </div>
</div>
<hr/>
