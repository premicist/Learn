# Implementation Plan — Perfect Competition Diagrams

## [Overview]
Add three hand-authored SVG diagrams to the note `content/notes/perfect-competition-price-and-output-determination.md`:
§2 (industry price determination vs. firm's horizontal demand), §3 (three short-run profit/loss states + shutdown point), §4 (long-run equilibrium + LAC envelope).
The old §2 figure (`perfect-competition-equilibrium.svg`, which misleadingly showed SAC/SMC tangency in the price-determination section) is replaced and deleted.
All figures follow repo conventions (see `monopoly-equilibrium-profit.svg`): white card bg, monochrome `#111`, Manrope, dashed guides, hatched `<pattern>` shading, `role="img"` + `aria-label`, `width="100%" height="auto"`, kebab-case names in `public/images/uploads/`, referenced as `/images/uploads/<name>.svg`.
No code/type/dependency changes; `src/data/generated/content.ts` is regenerated via `node scripts/build-content.mjs`.
Cost curves are drawn as proper U-shapes (falling then rising), SMC passing through min SAVC and min SAC.

## [Files]
- NEW `public/images/uploads/perfect-competition-industry-firm-demand.svg` (780×400, two panels: industry DD/SS with E/P*/Q*; firm's horizontal d=AR=MR=P* line, no cost curves, annotation card "price taker, E_d = ∞").
- NEW `public/images/uploads/perfect-competition-short-run-three-states.svg` (780×445, three 236×390 panels sharing identical curve geometry — SAC min (125,200), SAVC min (95,248), SMC through both minima; Panel 1 P=155 hatched profit rect; Panel 2 P=200 tangent at min SAC; Panel 3 P=225 hatched loss rect + shutdown dot S at min SAVC).
- NEW `public/images/uploads/perfect-competition-long-run-equilibrium.svg` (780×445, left: SAC/LAC tangent at (175,210), SMC & LMC through same point, P=AR=MR line; right: LAC envelope with three quadratic-Bezier SAC arcs tangent at t=0.30/0.50/0.70 of LAC, each staying above LAC).
- MODIFIED the note markdown: §2 line 36 reference swapped; §3 figure inserted after `### Three Possible Short-Run Profit States:`; §4 figure inserted after the "Every firm … Normal Profit (zero economic profit)." paragraph.
- DELETED `public/images/uploads/perfect-competition-equilibrium.svg`.
- REGENERATED `src/data/generated/content.ts` (via script; do not hand-edit).

## [Types]/[Functions]/[Classes]/[Dependencies]
None.

## [Testing]
1. XML well-formedness of all 3 SVGs (python xml.dom.minidom).
2. `npm run check` (build-content → tsc → oxlint, CI parity).
3. Verify 3 new paths in generated content.ts; old path gone.
4. Visual: each image URL 200 on localhost:5173; note page renders all three; checklist — §2 line horizontal at P* height; §3 identical geometry per panel, SMC through both minima, rects bounded by price↔SAC, no label overlaps; §4 all curves meet at one point, envelope arcs touch LAC once each.
5. Housekeeping: remove stray `dev.log` / `dev.err.log`.

## [Implementation Order]
1. Save this plan → 2. SVG §2 → 3. SVG §3 → 4. SVG §4 → 5. XML checks → 6. note edits → 7. delete old SVG → 8. `node scripts/build-content.mjs` + verify → 9. `npm run check` → 10. remove dev logs → 11. browser verification (iterate if needed) → 12. hand user commit commands.
