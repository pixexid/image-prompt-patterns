#!/usr/bin/env node

import { mkdir, readFile, readdir, unlink, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const api = "https://pixexid.com/api/images/";
const assetHosts = new Set(["pixexid.com", "media.pixexid.com"]);
const provenanceStatement =
  "Generated with built-in imagegen. Listed under the GPT Image 2.5 family; the exact backend variant was not exposed.";
const categories = [
  ["product_visuals", "Product visuals"],
  ["posters_typography", "Posters & typography"],
  ["transparent_assets", "Transparent assets"],
  ["character_identity", "Character identity"],
  ["illustration_backgrounds", "Illustration & backgrounds"],
  ["focused_edits", "Focused edits"],
];
const testedOn =
  "**Tested on:** GPT Image 2.5 (exact backend variant not exposed). Other generators may need small changes to this prompt.\n\n";
const uuid =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const fail = (message) => {
  throw new Error(message);
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function checkedUrl(value, expectedHost, label) {
  const url = new URL(value);
  if (url.protocol !== "https:" || !assetHosts.has(url.hostname))
    fail("Invalid pixexid " + label + " URL: " + value);
  if (expectedHost && url.hostname !== expectedHost)
    fail("Unexpected host for " + label + ": " + value);
  return url.toString();
}

export async function fetchCase(source, fetchImpl = fetch) {
  const response = await fetchImpl(api + encodeURIComponent(source.slug), {
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) fail("pixexid image unavailable (" + response.status + "): " + source.slug);

  const record = await response.json();
  if (
    record.slug !== source.slug ||
    !uuid.test(record.id) ||
    record.status !== "published" ||
    record.model !== "GPT Image 2.5" ||
    !record.exactPrompt?.trim() ||
    record.exactPrompt !== record.prompt
  )
    fail("Invalid campaign source: " + source.slug);

  const responsive = record.responsiveSources.map((item) => item.url);
  const imageUrls = {
    512: checkedUrl(
      responsive.find((url) => url.endsWith("/512.webp")),
      "media.pixexid.com",
      "512 image",
    ),
    1024: checkedUrl(
      responsive.find((url) => url.endsWith("/1024.webp")),
      "media.pixexid.com",
      "1024 image",
    ),
    original: checkedUrl(record.imageUrl, "media.pixexid.com", "original image"),
  };
  const canonical = checkedUrl(
    "https://pixexid.com/i/" + record.slug,
    "pixexid.com",
    "canonical",
  );

  return {
    kind: "campaign-standalone",
    origin: "pixexid",
    id: record.id,
    slug: record.slug,
    title: record.title,
    description: record.description,
    model: record.model,
    category: source.category,
    mode: record.mode,
    exact_prompt: record.exactPrompt,
    tags: record.tags,
    palette: record.colors,
    dimensions: { width: record.width, height: record.height },
    aspect: record.aspect,
    hasTransparency: record.hasTransparency === true,
    provenance: {
      generationTool: "built-in imagegen",
      exactBackend: "unknown",
      statement: provenanceStatement,
    },
    review: source.review,
    canonical_url: canonical,
    image_urls: imageUrls,
    created_at: record.createdAt,
  };
}

export function teamCase(source) {
  const detail = source.case;
  if (!detail) fail("Missing team case detail: " + source.slug);
  return {
    kind: "campaign-team",
    origin: "team",
    id: detail.id,
    slug: source.slug,
    title: detail.title,
    description: detail.description,
    model: "GPT Image 2.5",
    category: source.category,
    mode: detail.mode,
    exact_prompt: detail.exact_prompt,
    execution_prompt: detail.execution_prompt,
    tags: detail.tags,
    palette: detail.palette,
    dimensions: detail.dimensions,
    aspect: detail.aspect,
    hasTransparency: detail.hasTransparency === true,
    provenance: {
      generationTool: "built-in imagegen",
      exactBackend: "unknown",
      statement: provenanceStatement,
    },
    review: source.review,
    references: detail.references,
    preview: detail.preview,
    created_at: detail.created_at,
  };
}

export function caseMarkdown(item) {
  if (item.kind === "campaign-team") return teamCaseMarkdown(item);
  return (
    "# " +
    item.title +
    "\n\n" +
    item.description +
    "\n\n" +
    '<p align="center"><a href="' +
    item.canonical_url +
    '"><img src="' +
    item.image_urls["1024"] +
    '" alt="' +
    escapeHtml(item.description) +
    '" width="760"></a></p>\n\n' +
    "[Open on pixexid](" +
    item.canonical_url +
    ")\n\n" +
    testedOn +
    "## Prompt\n\n" +
    "Copy this prompt as a starting point. Image generation is nondeterministic, so a rerun will not reproduce identical pixels.\n\n" +
    "```text\n" +
    item.exact_prompt +
    "\n```\n\n" +
    "## Provenance\n\n" +
    "| Field | Value |\n| --- | --- |\n" +
    "| Tested on | GPT Image 2.5 (exact backend variant not exposed) |\n" +
    "| Mode | " +
    item.mode +
    " |\n" +
    "| Dimensions | " +
    item.dimensions.width +
    " × " +
    item.dimensions.height +
    " |\n" +
    "| Transparency | " +
    (item.hasTransparency ? "Yes" : "No") +
    " |\n\n" +
    "## Review notes and limitations\n\n" +
    "**" +
    item.review.verdict +
    " · checked " +
    item.review.checked +
    ".** " +
    item.review.notes +
    "\n\n" +
    "Catalogue text and data are licensed under [CC BY 4.0](../LICENSE). Linked images are not relicensed by this repository.\n"
  );
}

export function teamCaseMarkdown(item) {
  const references = item.references
    .map(
      (reference, index) =>
        index +
        1 +
        ". `" +
        (reference.path || reference.file) +
        "`: " +
        reference.role +
        "\n   - SHA-256 `" +
        reference.sha256 +
        "`\n   - " +
        reference.provenance,
    )
    .join("\n");
  const referenceEmbeds = item.references
    .filter((reference) => reference.path)
    .map(
      (reference) =>
        '<p align="center"><a href="../' +
        reference.path +
        '"><img src="../' +
        reference.path +
        '" alt="Reference sheet: ' +
        escapeHtml(reference.role) +
        '" width="420"></a></p>',
    )
    .join("\n");
  return (
    "# " +
    item.title +
    "\n\n" +
    item.description +
    "\n\n" +
    '<p align="center"><img src="../' +
    item.preview.path +
    '" alt="' +
    escapeHtml(item.description) +
    '" width="760"></p>\n\n' +
    testedOn +
    "## Prompt\n\n" +
    "Copy this standalone prompt as a starting point. Image generation is nondeterministic, so a rerun will not reproduce identical pixels.\n\n" +
    "```text\n" +
    item.exact_prompt +
    "\n```\n\n" +
    "## Reference-based run recipe\n\n" +
    "This case was generated from reference sheets supplied by the founder rather than from text alone. The sheets are required image inputs to reproduce the run; each is published below and under `assets/references/` so the result can be compared with its references, and the standalone prompt above remains the public copyable prompt.\n\n" +
    "**Ordered references**\n\n" +
    references +
    "\n\n" +
    (referenceEmbeds ? referenceEmbeds + "\n\n" : "") +
    "**Exact execution prompt**\n\n" +
    "```text\n" +
    item.execution_prompt +
    "\n```\n\n" +
    "## Provenance\n\n" +
    "| Field | Value |\n| --- | --- |\n" +
    "| Tested on | GPT Image 2.5 (exact backend variant not exposed) |\n" +
    "| Mode | " +
    item.mode +
    " |\n" +
    "| Dimensions | " +
    item.dimensions.width +
    " × " +
    item.dimensions.height +
    " |\n" +
    "| Transparency | " +
    (item.hasTransparency ? "Yes" : "No") +
    " |\n\n" +
    "## Review notes and limitations\n\n" +
    "**" +
    item.review.verdict +
    " · checked " +
    item.review.checked +
    ".** " +
    item.review.notes +
    "\n\n" +
    "Catalogue text and data are licensed under [CC BY 4.0](../LICENSE). The preview image is hosted in this repository under the same licence.\n"
  );
}

function cardImage(item) {
  return item.kind === "campaign-team" ? item.preview.path : item.image_urls["512"];
}

function cardTable(cards) {
  const rows = [];
  for (let index = 0; index < cards.length; index += 3) {
    const group = cards.slice(index, index + 3);
    rows.push(
      "<tr>\n" +
        group
          .map(
            (item) =>
              '<td align="center" valign="top"><a href="cases/' +
              item.slug +
              '.md"><img src="' +
              cardImage(item) +
              '" alt="' +
              escapeHtml(item.description) +
              '" width="260"></a><br><strong>' +
              escapeHtml(item.title) +
              "</strong></td>",
          )
          .join("\n") +
        "\n</tr>",
    );
  }
  return "<table>\n" + rows.join("\n") + "\n</table>";
}

export function readmeMarkdown(cases) {
  const counts = Object.fromEntries(
    categories.map(([key]) => [key, cases.filter((item) => item.category === key).length]),
  );
  const categoryIndex = categories
    .map(([key, label]) => {
      const count = counts[key];
      return count
        ? "| [" + label + "](#cat-" + key + ") | " + count + " |"
        : "| " + label + " | 0 |";
    })
    .join("\n");
  const categorySections = categories
    .map(([key, label]) => {
      const items = cases.filter((item) => item.category === key);
      if (!items.length)
        return '<a id="cat-' + key + '"></a>\n\n### ' + label + " (0)\n\nNo reviewed case in this release.";
      return (
        '<a id="cat-' + key + '"></a>\n\n### ' +
        label +
        " (" +
        items.length +
        ")\n\n" +
        cardTable(items)
      );
    })
    .join("\n\n");

  return (
    "# Image prompt patterns\n\n" +
    "Reusable AI image prompt patterns with real results, for any image generator.\n\n" +
    "Curated by the [pixexid team](https://pixexid.com/).\n\n" +
    "## How to use a pattern\n\n" +
    "1. Pick the pattern that matches the picture you need.\n" +
    "2. Copy its template and fill every `[slot]` with your own subject, setting and wording.\n" +
    "3. Compare your result with the examples on the pattern page. Each example links to its full prompt.\n" +
    "4. If the result misses, read the common failures on the pattern page before rewording everything.\n\n" +
    "## Patterns\n\n" +
    "- [Product photo brief](patterns/product-photo-brief.md): a fictional product, a set, one light direction and a blank surface.\n" +
    "- [Character reference sheet](patterns/character-reference-sheet.md): keep one character recognizable across new scenes.\n" +
    "- [Transparent cutout](patterns/transparent-cutout.md): a finished artwork on real transparency, with no background.\n" +
    "- [Poster with lettering](patterns/poster-with-lettering.md): one large word as the main shape of the poster.\n" +
    "- [Style transfer](patterns/style-transfer.md): change the medium and keep the subject the same.\n" +
    "- Photo restoration request: examples coming. No reviewed case exists yet.\n\n" +
    "## Guides\n\n" +
    "- [Prompt vocabulary](guides/prompt-vocabulary.md): lighting, lens, composition, material and print terms, each tied to a real prompt.\n\n" +
    "## Tested on\n\n" +
    "Every example was made with the generator named on its case page: GPT Image 2.5, with the exact backend variant not exposed. We have not run these prompts on other generators, so they may need small changes there. No seed, quality setting or cost is claimed because those values were not exposed.\n\n" +
    "## Community comparisons\n\n" +
    "Ran one of these prompts on another generator? Add a comparison with a pull request. See [CONTRIBUTING.md](CONTRIBUTING.md).\n\n" +
    "## All " +
    cases.length +
    " cases\n\n" +
    "<!-- category-counts " +
    JSON.stringify(counts) +
    " -->\n\n" +
    "| Category | Cases |\n| --- | ---: |\n" +
    categoryIndex +
    "\n\n" +
    categorySections +
    "\n\n" +
    "## Use the catalogue\n\n" +
    "The machine-readable [catalogue](data/cases.json), its [CSV export](data/cases.csv) and the [schema](schema/cases.schema.json) drive every case page and the counts above. Refresh and verify the export with:\n\n" +
    "```sh\nnode scripts/export.mjs\nnode --test scripts/*.test.mjs\nnode scripts/validate.mjs --links\n```\n\n" +
    "`node scripts/export.mjs --offline` rebuilds the pages and CSV from `data/cases.json` without fetching.\n\n" +
    "## Contributing and licensing\n\n" +
    "Contributions must provide a public pixexid image, the prompt, the generator it was made with, rights to share the material, and a completed visual review. See [CONTRIBUTING.md](CONTRIBUTING.md).\n\n" +
    "Catalogue text and structured data are [CC BY 4.0](LICENSE); scripts are [MIT](LICENSE-CODE). Linked images remain remotely hosted and are not relicensed here. See [RIGHTS.md](RIGHTS.md).\n\n" +
    "Independent community resource. Not affiliated with or endorsed by OpenAI.\n"
  );
}

const csvCell = (value) => '"' + String(value).replaceAll('"', '""') + '"';

export function csvExport(cases) {
  const rows = cases.map((item) => [
    item.slug,
    item.title,
    item.category,
    item.mode,
    item.aspect,
    item.hasTransparency,
    "GPT Image 2.5",
    item.canonical_url ?? "",
    item.exact_prompt,
  ]);
  return (
    [["slug", "title", "category", "mode", "aspect", "transparent", "tested_on", "url", "prompt"], ...rows]
      .map((row) => row.map(csvCell).join(","))
      .join("\n") + "\n"
  );
}

export async function exportCatalog(sources, fetchImpl = fetch) {
  return Promise.all(
    sources.map((source) =>
      source.kind === "team"
        ? Promise.resolve(teamCase(source))
        : fetchCase(source, fetchImpl),
    ),
  );
}

async function main() {
  const cases = process.argv.includes("--offline")
    ? JSON.parse(await readFile(join(root, "data/cases.json"), "utf8")).cases
    : await exportCatalog(JSON.parse(await readFile(join(root, "data/sources.json"), "utf8")));
  const caseDir = join(root, "cases");
  await mkdir(caseDir, { recursive: true });
  const expected = new Set(cases.map((item) => item.slug + ".md"));
  for (const name of await readdir(caseDir))
    if (name.endsWith(".md") && !expected.has(name)) await unlink(join(caseDir, name));
  await writeFile(
    join(root, "data/cases.json"),
    JSON.stringify({ schema_version: 3, cases }, null, 2) + "\n",
  );
  for (const item of cases)
    await writeFile(join(caseDir, item.slug + ".md"), caseMarkdown(item));
  await writeFile(join(root, "README.md"), readmeMarkdown(cases));
  await writeFile(join(root, "data/cases.csv"), csvExport(cases));
  console.log("Exported " + cases.length + " pixexid campaign cases.");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  await main();
