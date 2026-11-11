# Test the Web

Test the Web is a "pattern library" of mock web interfaces (login, payment, identity, multi-step forms, iframes, shadow DOM, and similar) that lets anyone quickly test common browser interactions. Its primary goal, per the README, is to capture patterns, both good and bad, in a working state so that experiences that interact with those patterns can be tested and developed. The site is a [Docusaurus](https://docusaurus.io) app in `client/`, served by a small [Express](https://expressjs.com/) server in `api/` that receives form submissions.

## Pattern rules (read before changing any pattern)

These come from the "Pattern Capture Philosophy" section of `README.md`. They are the rules in this repo that are easiest to break. Patterns should:

- Represent real-world cases, avoiding theoretical or manufactured scenarios.
- Be represented in the abstract, not referencing site/app-specific code.
- Not capture concerns beyond the described pattern (e.g. unused class names, code for experiences not included).
- **Avoid alterations to previously published patterns which will change the core functionality of the pattern.** Create a new pattern with the desired modifications instead.
- **Not be created or altered for the sake of passing tests or resolving broken functionality of external systems**, such as [BIT (browser-interactions-testing)](https://github.com/bitwarden/browser-interactions-testing).
- Treat all data used in patterns as ephemeral, avoiding storage unless required and described by the pattern.

The README says the library captures both good and bad patterns, so a "bad" pattern may be intentional. Don't "fix" a published pattern's core behavior; propose a new pattern instead.

## Authoritative docs

Point to these rather than restating them:

- `README.md`: goals, pattern capture philosophy, limitations, requirements, quick-start, `.env` overrides, SSL setup.
- `CONTRIBUTING.md`: links to the [Bitwarden Contributing Documentation](https://contributing.bitwarden.com/) for guidelines, tooling and code style.
- `SECURITY.md`: how to report vulnerabilities.
- `api/.env.example`: the optional environment overrides for the server.
- `.github/PULL_REQUEST_TEMPLATE.md`: PR body sections (Tracking, Objective, Screenshots).

## Layout

```text
api/                     Express server (TypeScript): app.ts, constants.ts, .env.example
client/                  Docusaurus site
  docs/forms/<category>/ Form patterns (.md for plain HTML, .mdx when a React component is used)
  docs/scenarios/        Behavioral scenarios (security/, stability/)
  src/components/        React components used by .mdx patterns
  src/pages/             Standalone pages (e.g. bare pages used inside iframes)
  src/theme/             Swizzled Docusaurus components
  static/js/             Scripts loaded by .md patterns
  scripts/               docusaurus-start.sh, lint-a11y.js
custom-words.txt         CSpell project dictionary
```

Each pattern's front matter carries its `slug`, `title`, `sidebar_label` and `description`; some also set `as_seen_on`. Look at sibling files in the same category before adding a pattern and match them.

## Commands

Node and npm versions are pinned in `.nvmrc` and the `engines` field of `package.json`. All commands run from the repo root unless noted.

```bash
npm ci                   # install root deps; postinstall also runs npm ci in api/ and client/
npm run build:watch      # README quick-start: rebuild client and restart API on change, then open http://localhost
npm run build            # build api then client (what CI runs, after npm ci)
npm run build:api        # api only (rimraf build && tsc)
npm run build:client     # client only (docusaurus build)
npm run serve-client     # serve the built client with docusaurus serve
npm run typecheck        # tsc in api/ and client/
npm run lint             # prettier --check .
npm run prettier         # prettier --write .
npm run spellcheck       # cspell on all .md/.mdx files
```

Client-only, run from `client/`:

```bash
npm run start            # Docusaurus dev server over HTTPS using the cert/key named in api/.env
npm run lint:a11y        # axe checks every URL in https://localhost/sitemap.xml; needs the site running and api/ssl.crt
```

There is no automated test suite: the `test` script in `api/package.json` is a stub that exits with an error. Don't add a test framework unless asked. CI (`.github/workflows/build.yml`) runs `npm ci` and `npm run build` on pull requests and pushes to `main`.

## Local setup notes

- Server overrides go in `api/.env` (see `api/.env.example`). `.env` is gitignored.
- The server looks for `ssl.crt` and `ssl.key` in `api/`. Without them it serves HTTP only. Both files are gitignored. Never commit them.

## Formatting and spelling

- Husky runs `lint-staged` on commit (`.husky/pre-commit`): Prettier on all staged files and CSpell on staged `.md`/`.mdx` files.
- `.mdx` files are excluded from Prettier (`.prettierignore`), per the Docusaurus note about MDX v3 support.
- If CSpell flags a legitimate word, add it to `custom-words.txt`. Front matter `as_seen_on:` lines are already ignored by CSpell.
- Markdown lint config is in `.markdownlint.json` (inline HTML allowed, no line length limit).
- Don't bypass the hooks with `--no-verify`. Fix the reported issue instead.

## When to stop and ask

Stop and confirm with the user before:

- Changing the core functionality of a published pattern, including removing or renaming it. The README says to create a new pattern instead.
- Changing a pattern because an external system such as BIT fails against it. The README rules this out.
- Adding storage or persistence of pattern data. The README asks for ephemeral data unless the pattern itself requires storage.
- Adding a pattern you can't tie to a real-world case. The README asks for real-world patterns, not manufactured ones.

## Contributing and commit style

- Follow `CONTRIBUTING.md` and the PR template.
- Most history is Renovate dependency updates (`[deps]: Update <package> to <version>`), configured in `.github/renovate.json`.
- Human commits are short, imperative, sentence-case summaries, usually prefixed with the Jira key, for example `[PM-45345] Add multi-step login pattern with animated password step`. Some older commits omit the key.
- A new pattern is usually a single focused change: the pattern file plus its script or component.
