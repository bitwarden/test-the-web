---
slug: newsletter-opaque-id
title: newsletter subscribe form with opaque field id
sidebar_label: opaque id newsletter
sidebar_position: 2
description: a newsletter signup form whose email field has no username-related keywords in its `id`, `name`, or `label` — only `type="email"` signals its purpose.
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <form
        class="card__body"
        method="POST"
        action="/subscribe"
        id="subscribe-form"
      >
        <h3>Sign up for updates</h3>
        <div class="row margin-bottom--md">
          <label for="notification-address" class="margin-right--sm">Sign up for updates</label>
          <input
            type="email"
            id="notification-address"
            name="contact"
            placeholder="you@example.com"
            required
          />
        </div>
        <div class="row">
          <button type="submit" class="button button--primary">Subscribe</button>
        </div>
      </form>
    </div>
  </div>
</div>
<hr/>
