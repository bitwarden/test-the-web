---
slug: create-account-ambiguous
title: ambiguous account creation form
sidebar_label: account (ambiguous)
description: a sign up form with minimal identifying attributes, requiring an email and password - it will POST the input values on submit
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <form
        class="card__body"
        method="POST"
        action="/account"
      >
        <div class="row">
          <div class="col col--12 margin-bottom--md">
            <input
              name="e"
              required
              type="text"
            />
          </div>
          <div class="col col--12 margin-bottom--lg">
            <input
              name="p"
              required
              type="password"
            />
          </div>
          <div class="col col--12">
            <button type="submit" class="button button--primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<hr/>
