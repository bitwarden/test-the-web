---
slug: update-password
title: update password form
sidebar_label: password
description: a form allowing a user to update their password, with basic input validation - it will POST the input values on submit
---

<script src="/js/new-password-match.js" defer="defer"></script>

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <form
        action="/account"
        class="card__body"
        method="POST"
      >
        <div class="row margin-bottom--md">
          <label for="currentPassword" class="col col--3">Current password</label>
          <input
            autocomplete="current-password"
            id="currentPassword"
            name="currentPassword"
            required
            spellcheck="false"
            type="password"
          />
        </div>
        <br/>
        <div class="row margin-bottom--md">
          <label for="newPassword" class="col col--3">New password</label>
          <input
            autocomplete="new-password"
            id="newPassword"
            name="newPassword"
            required
            spellcheck="false"
            type="password"
          />
        </div>
        <div class="row margin-bottom--md">
          <label for="newPasswordRetype" class="col col--3">Confirm new password</label>
          <input
            autocomplete="new-password"
            id="newPasswordRetype"
            name="newPasswordRetype"
            required
            spellcheck="false"
            type="password"
          />
        </div>
        <div
          class="row margin-bottom--md"
          id="error-container"
          style="color: red; display: none;"
        >
          <div class="col">The passwords do not match</div>
        </div>
        <div class="row">
          <div class="col">
            <button type="submit" class="button button--primary" disabled>Change password</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<hr/>
