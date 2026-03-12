---
slug: newsletter-alongside-login
title: newsletter subscribe form alongside a password-only login form
sidebar_label: newsletter alongside login
sidebar_position: 3
description: a page with both a newsletter signup form (opaque email field id/name) and a separate login form containing only a password field — the extension should not use the newsletter email as a cross-form username fallback
---

<div class="container margin-vert--xl">
  <div class="row margin-bottom--xl">
    <div class="card col col--12 padding--md">
      <form
        class="card__body"
        method="POST"
        action="/subscribe"
        id="subscribe-form"
      >
        <h3>Join our mailing list</h3>
        <div class="row margin-bottom--md">
          <label for="newsletter-contact" class="margin-right--sm">Join our mailing list</label>
          <input
            type="email"
            id="newsletter-contact"
            name="newsletter-contact"
            placeholder="you@example.com"
          />
        </div>
        <div class="row">
          <button type="submit" class="button button--secondary">Subscribe</button>
        </div>
      </form>
    </div>
  </div>
  <div class="row">
    <div class="card col col--12 padding--md">
      <form
        class="card__body"
        method="POST"
        action="/login"
        id="login-form"
      >
        <h3>Login</h3>
        <div class="row margin-bottom--md">
          <label for="login-password" class="margin-right--sm">Password</label>
          <input
            type="password"
            id="login-password"
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
<hr/>
