# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev-Server starten (http://localhost:5173)
npm run build    # Produktions-Build nach ./build/
npm run preview  # Build-Vorschau lokal
npm run lint     # ESLint
```

> Beim ersten Setup nach einem Clone: `rm -rf node_modules package-lock.json && npm install` — nötig wegen eines npm-Bugs mit optionalen nativen Bindings (rolldown/vite 8).

## Architektur

React 19 + Vite 8 + Tailwind CSS v4 (via `@tailwindcss/vite`). Kein State-Management-Framework, kein Router — alles in einer einzigen Seite.

**Datenfluss:**
- `src/data/*.js` — statische JS-Arrays mit allen Marktdaten (Competitors, PainPoints, Studies, News, Partners, Funding). Kein API-Call, keine externe Datenquelle.
- `src/components/*Tab.jsx` — jeder Tab importiert sein eigenes Daten-Array direkt und rendert es. Tabs kommunizieren nicht miteinander.
- `App.jsx` — verwaltet `activeTab` via `useState` und rendert den aktiven Tab per `switch`.

**Tab-Muster:**
Jeder `*Tab.jsx` folgt demselben Muster: lokaler Filter-State + Card-Grid + `<Modal>` für Detailansicht. `Modal.jsx` ist eine generische, wiederverwendbare Overlay-Komponente.

**Datenschema-Felder je Tab:**

| Tab | Datei | Pflichtfelder |
|-----|-------|---------------|
| CompetitorTab | `competitors.js` | `id, name, category, businessModel, pricing, relevance, relevanceNote` |
| PainPointsTab | `painPoints.js` | `id, title, description` |
| StudiesTab | `studies.js` | `id, title` |
| NewsTab | `news.js` | `id, title, date` |
| PartnersTab | `partners.js` | `id, name` |
| FundingTab | `funding.js` | `id, name` |

**Neuen Tab hinzufügen:**
1. Datei `src/data/newtab.js` mit Array anlegen
2. `src/components/NewTab.jsx` erstellen (nach bestehendem Tab-Muster)
3. In `App.jsx` importieren und `case` im `switch` ergänzen
4. In `TabNav.jsx` den neuen Tab-Eintrag hinzufügen
