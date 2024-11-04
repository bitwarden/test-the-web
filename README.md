# Let's Test the Web!

Test the Web enables anyone to quickly test common browser interactions on the web with mock interfaces.

## Requirements

- [npm](https://www.npmjs.com/)

## Quick-start

- clone the repo to your desired environment
- build and run with Node/npm:
  - `npm ci && npm run build:watch`
- go to `http://localhost`
- start testing!

## That, but with more options

Optionally, you can override some configurations by creating a dotfile named `.env` in the `/api` directory (see `.env.example` for details). All the other usual configuration options around Node.js, Docker, [Express](https://expressjs.com/), [Docusaurus](https://docusaurus.io/), etc. apply.

## SSL / Self-signed certificates

The express server will attempt to find and use provided cert and key files (by default, named `ssl.crt` and `ssl.key` respectively) located in the `/api` directory. If it cannot find any, it will run the HTTP server only (still allowing for easy placement behind an SSL proxy if desired).
