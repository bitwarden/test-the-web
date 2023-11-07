---
slug: iframe-sandboxed
title: sandboxed iframe login form
sidebar_label: iframe (sandboxed)
sidebar_position: 3
description: This is a basic login form nested within an inline frame (iframe) utilizing the sandbox attribute which is set to `allow-scripts allow-same-origin`. It will POST on submit and will return with a HTTP response code of `200`
---

<iframe
  id="test-iframe"
  src="/login-page-bare?docusaurus-data-bare-page=true"
  class="margin-vert--lg"
  style="overflow-y: hidden; width: 100%; height: 400px;"
  scrolling="no"
  sandbox="allow-scripts allow-same-origin"
></iframe>

<hr/>