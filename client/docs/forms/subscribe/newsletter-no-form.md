---
slug: newsletter-no-form
title: newsletter subscribe input with inline button, no form parent
sidebar_label: no-form newsletter
sidebar_position: 4
description: a newsletter signup email input with an inline submit button and no enclosing `<form>` element — a common pattern in landing-page hero sections.
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <div class="card__body">
        <h3>Get the latest updates</h3>
        <div class="row">
          <label for="subscribe-email" class="margin-right--sm">Email address</label>
          <input
            type="email"
            id="subscribe-email"
            name="subscribe-email"
            placeholder="you@example.com"
          />
          <button type="button" class="button button--primary margin-left--sm">Subscribe</button>
        </div>
      </div>
    </div>
  </div>
</div>
<hr/>
