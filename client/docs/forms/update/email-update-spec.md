---
slug: update-email-spec
title: spec-compliant update email form
sidebar_label: email (spec)
sidebar_position: 2
description: a form that is structured to conform with the standard autocomplete spec, and contains valid autocomplete attributes on all fields, allowing a user to update their email, requiring a password for request validation - it will POST the input values on submit
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <form
        action="/account"
        class="card__body"
        method="POST"
      >
        <div class="row">
          <div class="col col--12 margin-bottom--md">
            <label for="email" class="margin-right--sm">New email</label>
            <input
              autocomplete="off"
              id="email"
              inputmode="email"
              name="email"
              placeholder="e.g. jsmith@example.com"
              required
              spellcheck="false"
              type="email"
            />
          </div>
          <div class="col col--12 margin-bottom--md">
            <label for="password" class="margin-right--sm">Enter your password to confirm</label>
            <input
              autocomplete="current-password"
              id="password"
              name="password"
              required
              spellcheck="false"
              type="password"
            />
          </div>
        </div>
        <button type="submit" class="button button--primary">Update email</button>
      </form>
    </div>
  </div>
</div>
