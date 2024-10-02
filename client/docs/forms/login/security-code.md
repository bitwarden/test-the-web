---
slug: security-code
title: security code
sidebar_position: 20
description: A form that requires a security code
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
            <label class="tw-mb-1 tw-block tw-font-semibold tw-text-main" for="input-3">
              <span>Verification code</span>
              <small> (required)</small>
            </label>
            <br />
            <input
              autocapitalize="none"
              autocomplete="off"
              autocorrect="none"
              id="input-3"
              inputmode="verbatim"
              name="input-3"
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
