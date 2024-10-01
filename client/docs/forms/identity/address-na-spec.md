---
slug: address-spec-simple
title: spec-compliant address form (North America)
sidebar_label: address (NA, spec)
description: an address form that is structured to conform with the standard autocomplete spec, and contains valid autocomplete attributes on all fields
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <form
        class="card__body"
        method="POST"
        action="/identity"
      >
        <div class="row">
          <div class="col col--12 margin-bottom--md">
            <label for="full-name">Full name</label>
            <br/>
            <input
              type="text"
              id="full-name"
              name="full-name"
              placeholder="Evelyn Q. Wang"
              autocomplete="name"
              required
            />
          </div>
          <div class="col col--12 margin-bottom--md">
            <label for="company-name">Company Name (optional)</label>
            <br/>
            <input
              type="text"
              id="company-name"
              name="company-name"
              placeholder="Generic, Inc."
              autocomplete="organization"
              required
            />
          </div>
          <div class="col col--12 margin-bottom--md">
            <label for="email">Email (optional)</label>
            <br/>
            <input
              type="email"
              id="email"
              name="email"
              autocomplete="email"
              placeholder="you@example.com"
            />
          </div>
          <div class="col col--12 margin-bottom--md">
            <label for="email">Phone # (optional)</label>
            <br/>
            <input
              type="tel"
              id="phone-number"
              name="phone-number"
              autocomplete="tel"
              placeholder="(555) 555-5555"
            />
          </div>
          <div class="col col--12 margin-bottom--md">
            <label for="address">Address</label>
            <br/>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="1234 Main St"
              autocomplete="address-line1"
              required
            />
          </div>
          <div class="col col--12 margin-bottom--md">
            <input
              type="text"
              id="address-ext"
              name="address-ext"
              placeholder="Apt. #42"
              autocomplete="address-line2"
            />
          </div>
          <div class="col col--12 margin-bottom--md">
            <label for="city">City</label>
            <br/>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Beverly Hills"
              autocomplete="address-level2"
              required
            />
          </div>
          <div class="col col--12">
            <div class="margin-bottom--md">
              <select
                id="state"
                name="state"
                autocomplete="address-level1"
              >
                <option value="" selected>Select a state/territory</option>
                <optgroup label="Canada">
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="ON">Ontario</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                  <option value="YT">Yukon</option>
                </optgroup>
                <optgroup label="United States">
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                  <option value="AS">American Samoa (AS)</option>
                  <option value="GU">Guam (GU)</option>
                  <option value="MP">Northern Mariana Islands (MP)</option>
                  <option value="PR">Puerto Rico (PR)</option>
                  <option value="UM">United States Minor Outlying Islands (UM)</option>
                  <option value="VI">Virgin Islands (VI)</option>
                  <option value="AA">Armed Forces Americas (AA)</option>
                  <option value="AP">Armed Forces Pacific (AP)</option>
                  <option value="AE">Armed Forces Others (AE)</option>
                </optgroup>
              </select>
            </div>
            <div class="margin-bottom--md">
              <select
                id="country"
                name="country"
                autocomplete="country"
                required
              >
                <option value="" selected>Select a country</option>
                <option value="CA">Canada</option>
                <option value="MX">Mexico</option>
                <option value="US">United States</option>
              </select>
            </div>
          </div>
          <div class="col col--9">
            <label for="postcode">Postal code</label>
            <br/>
            <input
              type="text"
              id="postcode"
              name="postcode"
              placeholder="90210"
              autocomplete="postal-code"
              required
            />
          </div>
        </div>
        <hr/>
        <button type="submit" class="button button--primary">Submit</button>
      </form>
    </div>
  </div>
</div>
<hr/>
<!-- Phone, Company name -->
