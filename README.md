# Let's Test the Web!

Test the Web enables anyone to quickly test common browser interactions on the web with mock interfaces.

- [Let's Test the Web!](#lets-test-the-web)
  - [Goals and Intent](#goals-and-intent)
    - [Pattern Capture Philosophy](#pattern-capture-philosophy)
  - [Limitations](#limitations)
  - [Requirements](#requirements)
  - [Quick-start](#quick-start)
  - [That, but with more options](#that-but-with-more-options)
  - [SSL / Self-signed certificates](#ssl--self-signed-certificates)

## Goals and Intent

Test the Web is a "pattern library". The primary goal of the project is to capture various patterns (both good and bad) in a working state so as to facilitate testing and developing experiences that interact with those patterns.

### Pattern Capture Philosophy

With the aforementioned goals and intent in mind, patterns should:

- Represent real-world cases, avoiding theoretical or manufactured scenarios.
- Be represented in the abstract, not referencing site/app-specific code
- Not capture concerns beyond the described patterns (e.g. unused class names, code for experiences not included, etc.).
- Avoid alterations to previously published patterns which will change the core functionality of the pattern (instead prefer creating new patterns with the modifications desired).
- Not create or alter patterns for the sake of passing tests or resolving broken functionality of external systems (e.g. [BIT](https://github.com/bitwarden/browser-interactions-testing)).
- Treat all data used in patterns as ephemeral, avoiding storage unless required and described by the represented pattern.

## Limitations

- While the project aspires to capture all common patterns of the web, this is largely expected to be unachievable in whole, given the size and ever-changing nature of the web.
- Because the project is presently leveraging [docusaurus](https://github.com/facebook/docusaurus), complex or case-specific patterns can sometimes be difficult to replicate precisely.

## Requirements

- [git](https://git-scm.com/downloads)
- [node](https://nodejs.org/en)
- [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) (optional, if not using nvm; manually manage your node version to `.nvmrc`)

## Quick-start

- clone the repo to your desired environment
- build and run with Node/npm:
  - `npm ci && npm run build:watch`
- go to `http://localhost`
- start testing!

## That, but with more options

Optionally, you can override some configurations by creating a dotfile named `.env` in the `/api` directory (see `.env.example` for details). All the other usual configuration options around Node.js, Docker, [Express](https://expressjs.com/), [Docusaurus](https://docusaurus.io), etc. apply.

## SSL / Self-signed certificates

The express server will attempt to find and use provided cert and key files (by default, named `ssl.crt` and `ssl.key` respectively) located in the `/api` directory. If it cannot find any, it will run the HTTP server only (still allowing for easy placement behind an SSL proxy if desired).
