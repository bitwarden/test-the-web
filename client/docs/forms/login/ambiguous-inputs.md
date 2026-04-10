---
slug: ambiguous-inputs
title: inputs without an enclosing form or any semantic information
sidebar_label: ambiguous
description: bare inputs without an enclosing `<form>` tag that will POST the input values on submit (via `fetch`)
---

<script src="/js/ambiguous-inputs.js" defer="defer"></script>

<div class="container margin-vert--xl">
  <div class="row">
    <div class="card col col--12 padding--md">
      <div class="card__body ambiguous-inputs-container">
        <div class="row margin-bottom--md">
          <input
            type="text"
            name="u"
            required
          />
        </div>
        <div class="row margin-bottom--md">
          <input
            type="text"
            name="p"
            required
          />
        </div>
        <div class="row">
          <button id="ambiguous-inputs-go" class="button button--primary">Go</button>
        </div>
      </div>
    </div>
  </div>
</div>
<hr/>
