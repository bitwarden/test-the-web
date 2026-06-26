---
slug: login-with-newsletter-sibling
title: sign-in form alongside a newsletter opt-in card
sidebar_label: sibling newsletter
description: a single-step email sign-in form and a separate newsletter opt-in card (heading + checkbox) rendered in adjacent rows of the same container
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <h3>Sign in</h3>
      <form
        class="card__body"
        method="POST"
        action="/login"
        id="signin-form"
      >
        <div class="row margin-bottom--md">
          <label for="email" class="margin-right--sm">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div class="row">
          <button type="submit" class="button button--primary">Continue</button>
        </div>
      </form>
    </div>
  </div>
  <div class="row">
    <div class="card col col--12 padding--md">
      <h3>Subscribe to our newsletter</h3>
      <label>
        <input type="checkbox" name="newsletter-opt-in" />
        I'd like to receive periodic updates.
      </label>
    </div>
  </div>
</div>
<hr/>
