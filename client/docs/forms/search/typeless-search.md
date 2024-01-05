---
slug: typeless-search
title: typeless search input
sidebar_label: typeless
description: a search input with no `type` attribute within a search form that will POST on submit
---

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <form
        class="card__body"
        action="/search"
        method="POST"
        role="search"
      >
        <div class="row">
          <div class="col col--12">
            <input
              class="col col--6 margin-right--sm"
              id="globalSearch23"
              placeholder="Enter a product code or type"
            />
            <button type="submit" class="col col--2 button button--primary">Go</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
