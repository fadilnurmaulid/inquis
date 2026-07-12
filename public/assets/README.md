# INQUIS Visual Assets

This folder is the drop-in location for illustrated artwork that will
eventually replace the emoji glyphs currently used throughout gameplay.

## How it works

`components/shared/emoji-asset.tsx` exports `<EmojiAsset emoji="🦋" />`.
It looks up the emoji in `lib/assets/emoji-map.ts`. If a mapped image file
exists under `public/assets/...`, it renders that image. If not (which is
the case for 100% of items today), it silently falls back to rendering the
emoji glyph exactly as before. This means the app looks and behaves
identically until real artwork is added — nothing else needs to change.

## Folder structure

```
public/assets/
  companions/       World companion characters (Pola, Sori, Predik, Sains)
    world-1.svg      e.g. butterfly companion for World 1
    world-2.svg
    world-3.svg
    world-4.svg
  illustrations/     Gameplay objects (leaves, flowers, waste items, etc.)
    leaf-green.svg
    flower-sunflower.svg
    ...
```

## Adding a real illustration

1. Drop the image file (SVG preferred, PNG/WebP also supported) into the
   appropriate subfolder above.
2. Add or update the corresponding entry in `lib/assets/emoji-map.ts`,
   mapping the emoji glyph already used in `lib/activities/definitions.ts`
   to the new file path.
3. No other code changes are required — `<EmojiAsset>` picks it up
   automatically everywhere that emoji is used (explore items, challenge
   options, reflection options, companion icons, world cards).

## Design guidance for future illustrations

- Square aspect ratio, transparent background, simple flat/rounded
  illustration style consistent with the app's friendly, rounded
  aesthetic (see `frontend-design` conventions already used in the UI).
- Keep file sizes small; these render at 32–96px in most places.
- Environmental theme: favor warm, natural colors (greens, earth tones,
  sky blues) consistent with INQUIS's environmental awareness framing.
