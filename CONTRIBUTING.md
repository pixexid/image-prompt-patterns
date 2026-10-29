# Contributing

There are two ways to add to this repository: a new case, or a comparison of an existing prompt on another generator.

## Add a case

Propose only an image already published on pixexid that you created or have explicit rights to share.

1. Add its public slug, category, review date, verdict, and honest review notes to `data/sources.json`.
2. Confirm the public page shows the exact submitted prompt, the generator it was made with, dimensions, and stable 512/1024/original image URLs.
3. Run `node scripts/export.mjs`, `node --test scripts/*.test.mjs`, and `node scripts/validate.mjs --links`.
4. Review the generated case page and catalogue record before opening a pull request.

## Add a comparison

Ran a prompt from `cases/` on another generator? Add one file named `comparisons/<case-slug>-<generator>.md` containing:

- the generator name and version, and the date you ran it;
- the prompt exactly as you used it, and any changes you made to the original;
- your image, hosted where you have the right to share it, linked from the file;
- a short note on what matched the case and what did not.

Say only what you ran. Do not claim a result for a generator you did not use.

## Do not submit

Private user records, secrets, third-party reference files, personal data, real-person identity material without documented consent, sexualized minors, non-consensual intimate imagery, deceptive impersonation, hateful material, or work with uncertain ownership. A public URL alone is not proof of rights.

Contributors agree that catalogue text and data they submit may be distributed under CC BY 4.0. Linked images are not copied into this repository and retain their existing rights. Report security or privacy issues privately through [this repository's GitHub Security Advisories](../../security/advisories/new), not in a public issue.
