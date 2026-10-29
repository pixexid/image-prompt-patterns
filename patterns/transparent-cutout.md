# Transparent cutout

Use this when you want a finished piece of artwork on real transparency, ready to place on another background. The pattern asks for a scene slice: one small complete scene that is finished in the middle and loose at the edge.

## Template

```text
A [craft or medium] artwork forming one irregularly shaped scene slice with no background at all: the area surrounding the slice is completely transparent (alpha = 0), not white, not colored, no surface, no checkerboard pattern. The slice holds one small complete scene [built entirely from the material]: [subject in three to five parts, each with a color]. [Two material details that prove the medium]. At its boundary the piece ends the way [craft] ends: [two to four loose ends typical of the craft] scatter into the transparency, so the artwork looks finished at its heart and unfinished at its rim.

The slice sits fully intact with clear transparent margin on every side; the transparency extends uniformly to all four borders of the canvas. [Light, kept inside the slice]. No text appears anywhere. [Aspect ratio] composition.
```

## Why each part is there

- **Say what transparent means.** The prompts spell out "alpha = 0" and rule out white, color, a surface and a checkerboard. The reviews checked the files: the top-left pixel was fully transparent in the wren, dragonfly, tin sun and screenprint cases, and the wren review confirms no checkerboard was drawn.
- **A scene slice, not an object.** One bounded scene gives the generator a shape to end on. The dragonfly review measured an opaque fraction of 0.183 and found nothing clipped.
- **Loose ends that belong to the craft.** The wren scatters petals, the dragonfly's reeds trail into open spirals, the tin sun curls a corner of metal, the screenprint breaks into stray halftone dots. This is what keeps the edge from looking cut out with scissors.
- **Margin on all four borders.** "Clear transparent margin on every side" is there so nothing is clipped. The reviews measured the maximum alpha on each border row and column.
- **Light stays inside the slice.** Shadows and highlights are limited to the artwork, so nothing glows or casts onto the empty canvas.
- **No text.** The line "No text appears anywhere" is in every transparent case, and the reviews that checked for text found none.

## Examples

<table>
<tr>
<td align="center" valign="top"><a href="../cases/pressed-flower-wren-on-twig-slice-4712aff7.md"><img src="https://media.pixexid.com/pressed-flower-wren-on-twig-slice-4712aff7/8d21024cfc7a/512.webp" alt="A pressed-flower collage slice of a small wren perched on a real pressed twig, built from rust and ochre petals, its edge scattering loose petals on transparency." width="200"></a><br><strong>Pressed Flower Wren on Twig Slice</strong></td>
<td align="center" valign="top"><a href="../cases/iron-dragonfly-on-reeds-slice-2900cbdd.md"><img src="https://media.pixexid.com/iron-dragonfly-on-reeds-slice-2900cbdd/ba39e13a7f6c/512.webp" alt="A wrought-iron slice of a dragonfly with hammered metal wings resting on scrolling reeds, its bars ending loose on transparency." width="200"></a><br><strong>Iron Dragonfly on Reeds Slice</strong></td>
</tr>
<tr>
<td align="center" valign="top"><a href="../cases/punched-tin-sun-medallion-slice-946dfa40.md"><img src="https://media.pixexid.com/punched-tin-sun-medallion-slice-946dfa40/32ab1a1580d6/512.webp" alt="A punched-tin relief slice of a radiant sun medallion with hammered rays and painted accents, its metal edge curling loose on transparency." width="200"></a><br><strong>Punched Tin Sun Medallion Slice</strong></td>
<td align="center" valign="top"><a href="../cases/canal-bridge-screenprint-slice-1919a777.md"><img src="https://media.pixexid.com/canal-bridge-screenprint-slice-1919a777/64182b916ec7/512.webp" alt="A four-color screenprint slice of a canal with an arched bridge and a moored boat, halftone dots and slight misregistration dissolving into loose dots on transparency." width="200"></a><br><strong>Canal Bridge Screenprint Slice</strong></td>
</tr>
</table>

All four were tested on GPT Image 2.5 through built-in imagegen. [Spring ridge walk](../cases/spring-ridge-walk-leaf-collage-slice-1d5e0d44.md) and [quilled blossom branch](../cases/quilled-blossom-branch-with-birds-7cd0690d.md) use the same structure.

## Common failures

- **Asking for a flat color surface gives you a flat color surface.** The [cub and paper boat case](../cases/cub-sending-off-a-paper-boat-d16dc431.md) asks for the slice on "a perfectly flat, evenly lit matte pale-blush surface". The file has no alpha channel, and the review classified it as an illustration, not a transparent asset. That prompt is the right one when you want to extend the canvas by matching a flat color. For transparency, use the wording in the template.
- **Nearly transparent dust at the border.** The tin sun file has an alpha of 1/255 in the bottom-left corner and the screenprint has stray sub-threshold dust along the border. The reviewers read this as effectively transparent, not a background. Check the maximum alpha on each edge of your own file instead of trusting how it looks in a viewer.
- **A preview is not a file.** Every review here measured the delivered image. Open yours in an editor that shows the alpha channel before you build on it.
