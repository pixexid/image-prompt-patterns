# Character reference sheet

Use this when one character, person or animal has to stay recognizable across new scenes. You give the generator a reference sheet as an input image, then describe the new scene and list the traits that must not change.

The examples need the sheet as an image input. The prompt alone will not reproduce them. Each sheet is in `assets/references/` and embedded in its case page so you can compare the result with its input.

## Template

This is the structure of the execution prompts used for these cases. Keep the labels, replace the slots.

```text
Use case: identity-preserve
Primary request: Generate a new [photo type] of the exact [character] from Image 1 [doing one clear action in one place].
Input images: Image 1 is the sole identity anchor. Preserve its [face, hair, eyes, skin, body proportions, age]; do not copy the reference-sheet layout or [outfit in the sheet].
Scene/backdrop: [place, time of day, props], no readable writing.
Subject and load-bearing identity proportions: [Four to six measurable traits: face shape, cheekbones, jaw, hair mass, eye color, build.]
Wardrobe: [clothes, no branding].
Composition/framing: [crop], face unobscured, both hands in frame.
Lighting/mood: [light], [expression].
Constraints: Identity fidelity takes priority over scene styling. Exactly one head, two eyes, two arms, two hands, five fingers per visible hand. No readable text, logos, watermark, extra people or reference-sheet panels.
Avoid: [the wrong version of each trait above, for example widened round face, blue eyes].
```

## Why each part is there

- **One anchor image, named.** "Image 1 is the sole identity anchor" tells the generator which input decides the face. The two Sema cases use two sheets and give each a job: one for silhouette and hair, one for eyes and mouth.
- **Do not copy the sheet layout.** The line is there to keep the sheet's panel layout out of the scene. The review of the rainy studio case found no reference-sheet panel in the result.
- **Load-bearing proportions in words.** The reviewers measured these. For the rainy studio case they checked a long oval face, broad cheekbones, a tapered jaw and the high swept hair mass. For the red-haired case they checked the tall loose bun and the green-hazel eyes against the sheet.
- **An Avoid line that mirrors the traits.** The red-haired prompt lists "brown eyes" in its Avoid line and the review confirmed the eyes are green-hazel. Each trait gets a named wrong version.
- **Counts for hands and limbs.** The merle bulldog review counted four weight-bearing legs and four paws with separated toes, and the tidepool reflection did not read as a second dog.

## Examples

<table>
<tr>
<td align="center" valign="top"><a href="../cases/blond-man-studies-a-rainy-city-model-9acedb62.md"><img src="../assets/blond-man-studies-a-rainy-city-model-9acedb62.jpg" alt="A focused blond architect adjusts a scale model beneath warm task lights as rain blurs the city windows." width="200"></a><br><strong>Blond Man Studies a Rainy City Model</strong></td>
<td align="center" valign="top"><a href="../cases/blond-man-crosses-the-morning-flower-market-d2d3b695.md"><img src="../assets/blond-man-crosses-the-morning-flower-market-d2d3b695.jpg" alt="The blond character moves through a sunlit flower market with an easy smile and a plain canvas tote." width="200"></a><br><strong>Blond Man Crosses the Morning Flower Market</strong></td>
</tr>
<tr>
<td align="center" valign="top"><a href="../cases/red-haired-woman-tends-the-glasshouse-seedlings-37eb8b40.md"><img src="../assets/red-haired-woman-tends-the-glasshouse-seedlings-37eb8b40.jpg" alt="A freckled red-haired woman waters young plants beneath the misted panes of a quiet glasshouse." width="200"></a><br><strong>Red-Haired Woman Tends the Glasshouse Seedlings</strong></td>
<td align="center" valign="top"><a href="../cases/merle-bulldog-explores-a-misty-tidepool-e42f702d.md"><img src="../assets/merle-bulldog-explores-a-misty-tidepool-e42f702d.jpg" alt="A blue-gray merle French bulldog studies a reflective tidepool on a cool, mist-softened coast." width="200"></a><br><strong>Merle Bulldog Explores a Misty Tidepool</strong></td>
</tr>
</table>

All four were tested on GPT Image 2.5 through built-in imagegen with the sheet as the image input. [Blond woman finds a rare jazz record](../cases/blond-woman-finds-a-rare-jazz-record-8d3314a5.md) uses the same structure.

## Common failures

- **A detail outside the identity list changes between attempts.** The first two generations of the [flower market case](../cases/blond-man-crosses-the-morning-flower-market-d2d3b695.md) were flagged for mismatched footwear. The selected third generation changed the outfit to floor-length trousers whose cuffs cover both feet, which removes the problem instead of retrying it. If one detail keeps failing, change the prompt so it cannot appear.
- **Eye color reads wrong at display size.** The rainy studio review saw grey-blue irises in the downcast eyes and sampled the pixels instead of trusting the preview. The numbers matched the brown eyes the reference shows.
- **Small drift in build or styling.** The [jazz record case](../cases/blond-woman-finds-a-rare-jazz-record-8d3314a5.md) came back with more eye makeup than the sheet and a slightly fuller hip-to-waist contrast. The [merle bulldog](../cases/merle-bulldog-explores-a-misty-tidepool-e42f702d.md) came back a touch leggier than the reference. Both were recorded as notes, not defects. Compare against the sheet, not against your memory of the character.
- **The action lands in the wrong place.** In the [red-haired case](../cases/red-haired-woman-tends-the-glasshouse-seedlings-37eb8b40.md) the watering lands on the next seedling tray, not the pot her other hand holds. Say where the action ends if it matters.
