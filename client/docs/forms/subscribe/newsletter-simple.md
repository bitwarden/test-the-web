---
slug: newsletter-simple
title: simple newsletter subscribe form
sidebar_label: simple
description: a newsletter signup form with an email-named input field
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <h3>Stay in the loop</h3>
      <form
        class="card__body"
        method="POST"
        action="/subscribe"
        id="newsletter-form"
      >
        <div class="row margin-bottom--md">
          <label for="email" class="margin-right--sm">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
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
