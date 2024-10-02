---
slug: security-code-device
title: security code (device)
sidebar_position: 21
description: A form that expects a code filled by a security HID
as_seen_on: Bitwarden login
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <form
        class="card__body"
        method="POST"
        action="/login"
      >
        <div class="row">
          <div class="col col--12 margin-bottom--md">
            <label class="tw-mb-1 tw-block tw-font-semibold tw-text-main" for="input-4">
              <span>Verification code</span>
              <small> (required)</small>
            </label>
            <br />
            <input
              autocapitalize="none"
              autocomplete="off"
              autocorrect="none"
              id="input-4"
              inputmode="verbatim"
              name="input-4"
              type="password"
              required
            />
          </div>
          <div class="col col--12 margin-bottom--md">
          <button
            type="submit"
            class="col col--4 button button--primary"
          >
            <span>Continue</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
<hr />
