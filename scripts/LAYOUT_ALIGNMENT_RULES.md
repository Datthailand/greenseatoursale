# Webapp Greensea: GIT Pricing Table Layout Alignment Rules & Edit Log

This document logs the layout configuration rules for the pricing tables of the **Group Inclusive Tour (GIT)** packages in the Greensea Tour Sales Kit project. Use this as the source of truth for table column spans to prevent regression.

---

## 1. Context: Why the Alignment Issue Occurred

### The Mismatch
* The pricing tables in the GIT PDF sales kits have **8 columns** in total:
  - 7 group size bands: `8-9`, `10-14`, `15-19`, `20-24`, `25-29`, `30-34`, `35-42`.
  - 1 single supplement column: `นอนเดี่ยว`.
* In the **Vehicle type** row, there are 3 distinct blocks:
  1. `29 seats (mini bus)` -> spans columns `8-9` and `10-14` (2 columns).
  2. `35 seats` / `35 seats (coach)` -> spans column `15-19` (1 column).
  3. `45 seats (bus)` -> spans all remaining columns (`20-24` through `นอนเดี่ยว`) (5 columns).
* In the **Remarks (หมายเหตุ)** row, there are only 2 text blocks:
  - Left block: `"ไม่ฟรีหัวหน้าทัวร์ ..."` (Tour Leader is not free for groups smaller than 15 pax).
  - Right block: `"ฟรีหัวหน้าทัวร์ 1 ท่าน (นอนเดี่ยว) ..."` (1 Tour Leader is FOC starting from 15 pax).

### The Error
Previously, the parser/builder assumed the Remarks row should follow the same 3-block layout as the Vehicle row, creating:
- A left cell spanning 2 columns.
- An empty middle cell spanning 1 column (under `35 seats`).
- A right cell spanning 5 columns.

This caused an **extra vertical border line** to render under the `15-19` column, splitting the FOC Tour Leader section and leaving a blank space under `35 seats`. 

In reality, **15-19 pax is the threshold where the Tour Leader becomes free**. Therefore, the right block ("ฟรีหัวหน้าทัวร์...") applies to the `15-19` column too. There should be NO empty cell, and the right remarks cell must span the `15-19` column as well.

---

## 2. Correct Layout Definition (The Rules)

For all 14 GIT tours, the configuration in `backup-tours.json` must adhere to the following rules:

### A. Vehicle Row Spans
```json
"vehicleRows": [
  {
    "label": "Vehicle type",
    "cells": [
      { "text": "29 seats (mini bus)", "colSpan": 2 },
      { "text": "35 seats", "colSpan": 1 }, // or "35 seats (coach)" depending on region
      { "text": "45 seats (bus)", "colSpan": 5 }
    ]
  }
]
```

### B. Remarks Spans
* **Left cell span (`remarksLeftSpan`)**: `2` (covers columns `8-9` and `10-14`).
* **Middle cell span (`remarksMiddleSpan`)**: `0` (do NOT create an empty cell).
* **Right cell span (`remarksRightSpan`)**: `6` (covers columns `15-19` through `นอนเดี่ยว`).

Total span count: `2 + 0 + 6 = 8` (matches the 8 pricing table columns perfectly).

---

## 3. History of Fixes (Edit Log)

* **2026-06-11**: Extracted texts from all 4 GIT PDF sales kits using Python PDF extraction scripts.
* **2026-06-12 (Initial Standardisation)**: Updated `backup-tours.json` and `fetch-tours.js` to support `remarksLeftSpan = 2`, `remarksMiddleSpan = 1`, and `remarksRightSpan = 5`.
* **2026-06-12 (Layout Correction)**: Merged the middle empty cell. Adjusted spans to `remarksLeftSpan = 2`, `remarksMiddleSpan = 0`, `remarksRightSpan = 6` to remove the extra vertical line under `35 seats`. verified visually via local browser screenshot automation.
