---
slug: newsletter-by-heading
title: newsletter subscribe form with generic form and field attributes
sidebar_label: generic attrs
description: a newsletter signup form whose `<form>` and email input attributes use generic names (`contact-form`, `email-address`, `/api/save`); the form is preceded by an `<h3>Newsletter</h3>` heading
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <h3>Newsletter</h3>
      <form
        class="card__body"
        method="POST"
        action="/api/save"
        id="contact-form"
      >
        <div class="row margin-bottom--md">
          <label for="email-address" class="margin-right--sm">Email address</label>
          <input
            type="email"
            id="email-address"
            name="contact-email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div class="row">
          <button type="submit" class="button button--primary">Sign up</button>
        </div>
      </form>
    </div>
  </div>
</div>
<hr/>
