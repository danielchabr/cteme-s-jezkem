# CLAUDE.md

## Commits & privacy

This is a **public** repo. Never let a personal email address land in commit
metadata.

- Always commit as the GitHub noreply address:
  `3509981+danielchabr@users.noreply.github.com`.
- Do **not** use `dan@gtowizard.com` or `danielchabr@proton.me` as author or
  committer — these are private and must stay out of history.
- The repo-local `git config user.email` is already set to the noreply address;
  don't override it with `-c user.email=...` or `--author=...` using a real
  address.
- If you ever notice a personal email in a commit you're about to push, stop and
  flag it before pushing.
