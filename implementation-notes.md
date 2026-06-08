# Implementation Notes

## 2026-06-08

- Built a new React/Vite single-page sales kit catalog in this workspace because no existing app scaffold was present.
- Used `data_goc/Sales kit_FIT` and `data_goc/Sales kit_GIT` as the source of truth. There are 8 PDF sale kits and 23 extracted tour programs.
- Rendered each sale kit cover page with Poppler and copied PDFs into `public/sales-kits/` so the web app can open the original documents.
- Kept itinerary text as concise quote-oriented summaries. Detailed meal menus and Thai text remain in the linked source PDFs to avoid over-parsing imperfect PDF extraction.
- Price grids, group-size bands, single supplements, seasonal rows, source PDF labels, and source page references were transcribed from the extracted PDF price pages.
- UI direction follows the generated concept in `design/green-sea-catalog-concept.png`: dense B2B tour catalog, FIT/GIT and region filters, searchable tour cards, detail panel, PDF action, and copy-quote action.
- Browser plugin tooling was listed in the environment but no browser automation tool was exposed through tool discovery, so rendered QA used Python Playwright against `http://127.0.0.1:5173/`.
- QA covered desktop 1440x1000, mobile 390x844, package filtering, search, tour selection, pricing tab, copy quote notes, PDF `HEAD` status, image asset loading, console errors/warnings, and body overflow checks.
- A React runtime crash from missing `React` import in `src/App.jsx` was fixed, and the desktop pricing table was tightened so the `Single` column remains visible without horizontal scroll.
- 2026-06-08 follow-up redesign: user rejected the first UI as not matching the generated concept. Reworked `src/App.jsx` and `src/styles.css` to match the reference more closely: full top navigation, white two-column sale-kit workspace, horizontal tour cards with red price column, non-hero detail panel, itinerary/price/inclusion sections visible in one detail card, and FIT/GIT shown only as a small chip next to the tour code.
- Added cropped local thumbnails under `public/assets/thumbs/` from the PDF cover images so cards use scenic thumbnails instead of full PDF covers. QA rerun with Playwright for FIT default screen and GIT/PQC01 detail; no console errors or horizontal body overflow.
