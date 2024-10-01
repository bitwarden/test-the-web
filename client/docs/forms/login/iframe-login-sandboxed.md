---
slug: iframe-sandboxed-login
title: sandboxed iframe login form
sidebar_label: iframe (sandboxed)
sidebar_position: 4
description: a login form nested within an inline frame (iframe) utilizing the sandbox attribute which is set to `allow-scripts allow-forms allow-same-origin` - it will POST on submit
---

<iframe
  id="test-iframe"
  src="/login-page-bare?docusaurus-data-bare-page=true"
  class="margin-vert--lg"
  style="overflow-y: hidden; width: 100%; height: 400px;"
  scrolling="no"
  sandbox="allow-scripts allow-forms allow-same-origin"
></iframe>

<hr/>
