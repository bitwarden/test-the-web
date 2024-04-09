---
slug: typeless-search
title: typeless search input
sidebar_label: typeless
description: a search input with no `type` attribute or encapsulating `form` that will POST on submit and receive a response with mock data, alongside a login form that will POST on submit
as_seen_on: groww.in
---

<script src="/js/typeless-search.js" defer="defer"></script>

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <div class="row center margin-bottom--xl">
        <div class="col col--12">
          <input
            class="typeless-search-input col col--6 margin-right--sm"
            placeholder="What are you looking for today?"
          />
          <button id="search-submit" type="submit" class="col col--2 button button--primary">Go</button>
        </div>
      </div>
      <form
        class="card__body"
        method="POST"
        action="/login"
      >
        <div class="row margin-bottom--md">
          <label for="username" class="margin-right--sm">Username</label>
          <input
            type="text"
            id="username"
            name="logon_username"
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
