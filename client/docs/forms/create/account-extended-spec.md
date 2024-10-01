---
slug: create-account-extended-spec
title: spec-compliant simple account creation form with identity information
sidebar_label: account (extended info, spec)
sidebar_position: 3
description: an sign up form that is structured to conform with the standard autocomplete spec, and contains valid autocomplete attributes on all fields
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
          <div class="col col--5 margin-bottom--md">
            <label for="email">Email</label>
            <br/>
            <input
              class="col"
              autocomplete="email"
              id="email"
              name="email"
              placeholder="e.g. jsmith@example.com"
              required
              type="text"
            />
          </div>
        </div>
        <div class="row">
          <div class="col col--5 margin-bottom--lg">
            <label for="password">Create a password</label>
            <br/>
            <input
              class="col"
              autocomplete="new-password"
              id="password"
              name="password"
              required
              type="password"
            />
          </div>
        </div>
        <div class="row">
          <div class="col col--6 margin-bottom--md">
            <label for="full-name">Full name</label>
            <br/>
            <input
              class="col"
              type="text"
              id="full-name"
              name="full-name"
              placeholder="Evelyn Q. Wang"
              autocomplete="name"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col col--6 margin-bottom--md">
            <label for="company-name">Company Name (optional)</label>
            <br/>
            <input
              class="col"
              type="text"
              id="company-name"
              name="company-name"
              placeholder="Generic, Inc."
              autocomplete="organization"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col col--4 margin-bottom--lg">
            <label for="email">Phone # (optional)</label>
            <br/>
            <input
              class="col"
              type="tel"
              id="phone-number"
              name="phone-number"
              placeholder="(555) 555-5555"
              autocomplete="tel"
            />
          </div>
        </div>
        <div class="row margin-bottom--lg">
          <div class="col col--6">
            <label for="address">Address</label>
            <br/>
            <input
              class="col margin-bottom--sm"
              type="text"
              id="address"
              name="address"
              placeholder="1234 Main St"
              autocomplete="address-line1"
              required
            />
            <input
              class="col"
              type="text"
              id="address-ext"
              name="address-ext"
              placeholder="Apt. #42"
              autocomplete="address-line2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col col--5 margin-bottom--md">
            <label for="city">City</label>
            <br/>
            <input
              class="col"
              type="text"
              id="city"
              name="city"
              placeholder="Beverly Hills"
              autocomplete="address-level2"
              required
            />
          </div>
          <div class="col col--4 margin-bottom--md">
            <label for="state">State</label>
            <br/>
            <input
              class="col"
              type="text"
              id="state"
              name="state"
              placeholder="California"
              autocomplete="address-level1"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col col--4 margin-bottom--md">
            <label for="country">Country</label>
            <br/>
            <input
              class="col"
              type="text"
              id="country"
              name="country"
              placeholder="United States"
              autocomplete="country"
              required
            />
          </div>
          <div class="col col--2 margin-bottom--lg">
            <label for="postcode">Postal code</label>
            <br/>
            <input
              class="col"
              type="text"
              id="postcode"
              name="postcode"
              placeholder="90210"
              autocomplete="postal-code"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col col--3">
            <button type="submit" class="col button button--primary">Sign up</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<hr/>
