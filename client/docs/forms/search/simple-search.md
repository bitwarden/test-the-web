---
slug: simple-search
title: simple search form
sidebar_label: simple
sidebar_position: 1
description: a search form that will POST on submit and receive a response with mock data
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
              type="search"
              class="col col--6 margin-right--sm"
              id="search"
              name="q"
              autocapitalize="off"
              autocorrect="off"
              spellcheck="true"
              placeholder="e.g. 'cats playing keyboards'"
            />
            <button type="submit" class="col col--2 button button--primary">Go</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
