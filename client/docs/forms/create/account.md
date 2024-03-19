---
slug: create-account
title: account creation form
sidebar_label: account
description: a sign up form requiring an email and password - it will POST the input values on submit
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
            <label for="email">Enter the email you'd like to create an account with</label>
            <br/>
            <input
              aria-required="true"
              autocomplete="email"
              id="email"
              name="email"
              placeholder="e.g. jsmith@example.com"
              required
              type="text"
            />
          </div>
          <div class="col col--12 margin-bottom--lg">
            <label for="password">Create a password</label>
            <br/>
            <input
              aria-required="true"
              autocomplete="new-password"
              id="password"
              name="password"
              required
              type="password"
            />
          </div>
          <div class="col col--12">
            <button type="submit" class="button button--primary">Sign up</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<hr/>
