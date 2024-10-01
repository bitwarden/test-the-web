---
slug: simple-spec
title: spec-compliant login form
sidebar_label: simple (spec)
sidebar_position: 2
description: a basic login form that is structured to conform with the standard autocomplete spec, and contains valid autocomplete attributes on all fields and will POST the input values on submit
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <form
        class="card__body"
        method="POST"
        action="/login"
      >
        <div class="row margin-bottom--md">
          <label for="username" class="margin-right--sm">Username</label>
          <input
            autocomplete="username"
            id="username"
            name="username"
            placeholder="e.g. jsmith, jsmith@example.com"
            type="text"
            required
          />
        </div>
        <div class="row margin-bottom--md">
          <label for="password" class="margin-right--sm">Password</label>
          <input
            autocomplete="current-password"
            id="password"
            name="password"
            type="password"
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
