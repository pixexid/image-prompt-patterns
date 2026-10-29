# Style transfer

Here, style transfer means changing the medium and keeping the subject. A flat graphic character is re-rendered as a physical object: glazed ceramic, wool, wood or resin. It does not mean applying the look of one picture to a different photo.

Both examples use a character called Sema and two reference sheets. The sheets are in `assets/references/`.

## Template

This is the structure of the execution prompts used for these cases.

```text
Use case: style-transfer
Primary request: Re-render the exact [flat or graphic subject] from Image 1 [and Image 2] as a [handcrafted object in a named material] photographed as a physical object. Change the medium only; preserve the identity and proportions.
Input images: Image 1 is the primary [silhouette, angle, hair or outline, face placement] anchor. Image 2 is the primary [eyes, mouth, expression] anchor.
Scene/backdrop: [one plain surface], no other objects.
Subject and load-bearing identity proportions: [measurable shape, placement and ratio of each feature].
Medium/material: [real material, how it is finished, one honest imperfection such as glaze pooling or kiln variation].
Composition/framing: [crop], object fully contained with generous margin.
Lighting/mood: [light].
Constraints: Medium translation must not alter identity geometry. No [things that should not be added], no flattened printed illustration.
Avoid: [the wrong version of each proportion].
```

## Why each part is there

- **Change the medium only.** The prompts say "Change the medium only" ([Sema Becomes a Glazed Ceramic Portrait](../cases/sema-becomes-a-glazed-ceramic-portrait-337c92bd.md)). The review measured the ceramic head at about 1.07 times wider than tall, matching the "slightly wider than tall" ([Sema Becomes a Glazed Ceramic Portrait](../cases/sema-becomes-a-glazed-ceramic-portrait-337c92bd.md)) proportion in the prompt.
- **Each input image has one job.** The prompts assign silhouette and hair to Image 1 and eyes and mouth to Image 2. The reviewed outputs kept the recorded proportions. No case compares this against a run with unsplit inputs, so the split is the method used here, not a tested cause.
- **The material is described as physical, with one flaw.** The prompt asks for "Slight glaze pooling and kiln variation" ([Sema Becomes a Glazed Ceramic Portrait](../cases/sema-becomes-a-glazed-ceramic-portrait-337c92bd.md)). The review records raised relief with real thickness, glaze pooling along the contours, specular gloss, subtle kiln mottling and a physical cast shadow, which together read as fired ceramic and not a flat print.
- **Say what would count as failure.** The four material prompt avoids "four color variants of the same material" ([Sema Travels Across Four Crafted Materials](../cases/sema-travels-across-four-crafted-materials-36e3d7f0.md)). The review confirmed four distinct media: felted wool, glazed ceramic, carved painted wood and cast resin.
- **A grid is described exactly.** The prompt asks for "Exact 2-by-2 grid, one fully contained head per cell, matching scale" ([Sema Travels Across Four Crafted Materials](../cases/sema-travels-across-four-crafted-materials-36e3d7f0.md)). The review measured the head sizes within a 5.9 percent width spread.

## Examples

<table>
<tr>
<td align="center" valign="top"><a href="../cases/sema-becomes-a-glazed-ceramic-portrait-337c92bd.md"><img src="../assets/sema-becomes-a-glazed-ceramic-portrait-337c92bd.jpg" alt="Sema's familiar graphic identity becomes a hand-glazed ceramic relief under quiet museum light." width="200"></a><br><strong>Sema Becomes a Glazed Ceramic Portrait</strong></td>
<td align="center" valign="top"><a href="../cases/sema-travels-across-four-crafted-materials-36e3d7f0.md"><img src="../assets/sema-travels-across-four-crafted-materials-36e3d7f0.jpg" alt="Sema's fixed identity moves across wool, ceramic, carved wood, and translucent resin in one comparative study." width="200"></a><br><strong>Sema Travels Across Four Crafted Materials</strong></td>
</tr>
</table>

Both were tested on GPT Image 2.5 with the two sheets as image inputs.

## Common failures

Neither case recorded a miss, so this page lists what the reviewers checked for instead:

- The silhouette staying near-circular and the fringe sweeping in the right direction, not reversed or centered.
- Four different materials, not four colorways.
- The grid being an exact 2 by 2 with a border and every head inside its cell.
