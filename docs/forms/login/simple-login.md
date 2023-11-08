---
slug: simple
title: simple login form
sidebar_label: simple
sidebar_position: 1
description: This is a basic login form that will POST the input values on submit.
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <form
        class="card__body"
        method="POST"
        action="/login"
      >
        <input
          type="hidden"
          name="_token"
          value="abcdefghijklmnopqrstuvwxyz1234567890"
        />
        <div class="row margin-bottom--md">
          <label for="username" class="margin-right--sm">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="e.g. jsmith, jsmith@example.com"
            required
          />
        </div>
        <div class="row margin-bottom--md">
          <label for="password" class="margin-right--sm">Password</label>
          <input
            type="password"
            id="password"
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
