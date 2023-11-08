---
slug: card-payment-input
title: card payment form
sidebar_label: card payment form
description: This is a basic payment card form that will POST the input values on submit.
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <form
        class="card__body"
        method="POST"
        action="/payment"
      >
        <input
          type="hidden"
          name="_token"
          value="abcdefghijklmnopqrstuvwxyz1234567890"
        />
        <div class="row">
          <div class="col col--12 margin-bottom--md">
            <label for="card-name">Name on card</label>
            <br/>
            <input
              type="text"
              name="card-name"
              id="card-name"
              placeholder="J. Smith"
              required
            />
          </div>
          <div class="col col--12 margin-bottom--md">
            <label for="card-number">Credit card number</label>
            <br/>
            <input
              type="text"
              name="card-number"
              id="card-number"
              placeholder="1234567890123456"
              maxlength="19"
              pattern="\d{12,19}"
              title="a digit value between 12 and 19 characters in length"
              required
            />
          </div>
          <div class="col col--5 margin-bottom--md">
            <label for="card-expiration">Expiration</label>
            <br/>
            <input
              type="text"
              name="card-expiration"
              id="card-expiration"
              placeholder="01/29"
              maxlength="5"
              pattern="\d{2}\/\d{2}"
              title="a month / year date formatted as mm/yy"
              required
            />
          </div>
          <div class="col col--5 margin-bottom--md">
            <label for="card-cvv">CVV</label>
            <br/>
            <input
              type="text"
              name="card-cvv"
              id="card-cvv"
              placeholder="000"
              maxlength="4"
              pattern="\d{4}"
              title="a 3-4 digit value"
              required
            />
          </div>
        </div>
        <hr />
        <button type="submit" class="button button--primary">Submit</button>
      </form>
    </div>
  </div>
</div>
<hr/>
