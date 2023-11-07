---
slug: input-constraints-login
title: login form with input constraints
sidebar_label: input constraints
description: This is a login form with input constraints that will disallow automated or manual entry of non-matching value patterns. It will POST the input values on submit and will return with an HTTP response code of `200`
---

<script src="/js/input-constraints-login.js" defer="defer"></script>

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <form
        class="card__body"
        method="POST"
        action="/login"
      >
        <div class="row">
          <label for="email" class="margin-right--sm">User Email</label>
          <input
            type="email"
            id="email"
            name="email"
            label="User email"
            placeholder="e.g. jsmith@example.com"
            required
          />
        </div>
        <div class="row margin-bottom--md">
          <sub>This field requires a valid email pattern</strong>.</sub>
        </div>
        <div class="row">
          <label for="org-name" class="margin-right--sm">Org Name</label>
          <input
            type="text"
            id="org-name"
            name="org-name"
            label="Org Name"
            value="Org Corp."
            readonly
            required
          />
        </div>
        <div class="row margin-bottom--md">
          <sub>This field is <strong>read only</strong>.</sub>
        </div>
        <div class="row">
          <label for="password" class="margin-right--sm">User Password</label>
          <input
            type="password"
            id="password"
            name="password"
            maxlength="6"
            pattern="[0-9]{6}"
            title="The expected input format is a 6-digit number"
            required
          />
        </div>
        <div class="row margin-bottom--md">
          <sub>This field requires a <strong>6-digit number</strong> and will <strong>only accept up to 6 numerical inputs</strong>.</sub>
        </div>
        <div class="row">
          <button type="submit" class="button button--primary">Login</button>
        </div>
        <input
          type="hidden"
          name="_token"
          value="abcdefghijklmnopqrstuvwxyz1234567890"
        />
      </form>
    </div>
  </div>
</div>
<hr/>
