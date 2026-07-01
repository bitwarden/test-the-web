---
slug: create-account-passwordrules
title: account creation form with passwordrules
sidebar_label: account (passwordrules)
sidebar_position: 2
description: a sign up form requiring an email and password - supports dynamic `passwordrules` attribute on the password field
---

<script src="/js/account-passwordrules.js" defer="defer"></script>

<div class="col col--12 margin-vert--lg hide-on-bare-page">
  <label for="passwordrules-input">
    Password rules (<a href="https://github.com/whatwg/html/issues/3518">HTML definition</a>)
  </label>
  <br/>
  <input
    id="passwordrules-input"
    placeholder="e.g. minlength: 20; required: upper; required: digit;"
    type="text"
    style="width: 100%"
  />
</div>

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
              autocomplete="new-password"
              id="password"
              name="password"
              passwordrules="minlength: 20; required: upper; required: digit;"
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
