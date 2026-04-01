# Laica Market Analysis Dashboard

Vollständig funktionierendes React-Dashboard für Marktanalyse mit Tailwind CSS v4.

## Projektstruktur

```
src/
├── App.jsx                          # Hauptkomponente (Router, Header, Footer)
├── components/
│   ├── Modal.jsx                    # Wiederverwendbare Modal-Komponente
│   ├── TabNav.jsx                   # Tab-Navigation mit Icons
│   ├── ExecutiveSummary.jsx         # Key-Zahlen Cards oben
│   ├── CompetitorTab.jsx            # 19 Mitbewerber, filterable nach Kategorie
│   ├── PainPointsTab.jsx            # 10 Pain Points mit Balkendiagrammen
│   ├── StudiesTab.jsx               # 12 Markt-Studien mit Key-Metrics
│   ├── NewsTab.jsx                  # 52 News-Artikel, filter nach Kategorie/Sentiment
│   ├── PartnersTab.jsx              # 20 strategische Partner mit Radar-Scores
│   └── FundingTab.jsx               # 20 Förderprogramme mit Deadline-Alerts
└── data/
    ├── competitors.js               # 19 Competitor-Daten
    ├── painPoints.js                # 10 Pain Points mit Quellen
    ├── studies.js                   # 12 Studien mit Key-Numbers
    ├── news.js                      # 52 News + 6 Pain-Point Gruppierungen
    ├── partners.js                  # 20 Strategic Partners
    └── funding.js                   # 20 Förderprogramme
```

## Daten

### competitors.js (19 Einträge)
- 4 Vergleichsportale (OMR, Appvizer, trusted.de, Capterra)
- 4 Matching-Plattformen (IT-Matchmaker, SoftGuide, Pörtner, Agenturfinder)
- 7 KI-Beratungsagenturen (ADence, Next Strategy, Workflow-Agentur, Masasana, etc.)
- 3 Bildungs-/Förder-Angebote (Mittelstand-Digital, appliedAI, NEXperts)

Jeder Eintrag: ID, Name, URL, Kategorie, Business Model, Pricing, Focus, Relevance, Stärken/Schwächen, Details

### painPoints.js (10 Einträge)
1. Datenschutz & DSGVO-Compliance (95%)
2. Tool-Überfluss & Data Silos (92%)
3. Fachkräftemangel (88%)
4. ROI-Unsicherheit bei KI (85%)
5. Customization vs. Standard (82%)
6. Vendor Lock-in (80%)
7. Implementierungskosten (78%)
8. Subscription-Kosten (75%)
9. Change Management (72%)
10. Fehlende Beratung (70%)

Jeder: Weight (%), Beschreibung, gewünschte Lösung, Quellen mit Links, Beispiele

### studies.js (12 Einträge)
- Bitkom KI 2025
- DIHK Digitalisierung 2025
- KfW Digitalisierungsbericht 2024
- Gartner Software Buying 2025
- GP Bullhound European SaaS 2025
- IDC SMB 2026
- Forrester B2B 2026
- Capterra Tech Trends 2025
- Gartner SaaS Forecast
- BVMW Mittelstandsbarometer
- IW Köln KI Wettbewerbsfaktor
- IONOS KMU Digitalisierung

Jeder: Titel, Publisher, Datum, URL, Key Findings (Array), Key Numbers (Array), Relevance

### news.js (52+ Artikel)
Kategorisiert nach:
- souveraenitaet (Digitale Souveränität)
- gaiax (Gaia-X & Sovereign Cloud)
- foerderung (KMU-Digitalisierung & Förderung)
- dsgvo (DSGVO-konforme Alternativen)
- opensource (Open Source Strategie)
- kiverordnung (KI-Verordnung EU)
- cloud (Souveräne Cloud)
- nis2 (NIS2 & Cybersicherheit)
- verwaltung (Verwaltungsdigitalisierung)

Sentiment: "positiv", "neutral", "kritisch", "warnung"

Plus: newsPainPoints Array - 6 Pain-Point-Gruppierungen mit related Article IDs

### partners.js (20 Outlets)
Phase 1 (Priority):
- Everlast AI (125K YouTube Subs, 450K monthly views)
- KI im Mittelstand Podcast
- Jens Polomski KI-Newsletter (42K Subs, 35% Open Rate)
- Mittelstand-Digital Zukunftskultur Podcast
- BVMW (400K Mitglieder)
- KI Bundesverband

Phase 2 (Active):
- AININ Newsletter, Neuland.ai, Digitalberatung.de, UPDATE Tech Briefing, etc.

Phase 3 (Explore):
- Handelsblatt, Heise Online, T3N, Cloud Computing Insider, etc.

Jeder: Reach Metrics, Values, Authority/Values/Reach Scores (0-100), Examples, Why Alliance

### funding.js (20 Programme)
Kategorisiert nach Dringlichkeit:
- URGENT (< 30 Tage): InnoStartBonus SAB, KI-Transfer BMBF, etc.
- ACTIVE (3-6 Monate): Digital-Jetzt, Innovationen für Nachhaltigkeit, etc.
- ONGOING (ganzjährig): ZIM, EXIST, KfW StartGeld, etc.

Jeder: Name, Provider (BMWK/BMBF/KfW/EU), Type (bund/land/eu), Amount, Conditions (Array), Deadline, Relevance (1-10), Details

## Komponenten

### Modal.jsx
- Overlay mit Fade-In
- Sticky Header mit Close-Button
- Scrollbarer Body (max-height)
- Props: isOpen, onClose, title, children

### TabNav.jsx
- 6 Tabs mit Lucide Icons
- Active-Indicator
- Responsive (sticky scrollbar auf Mobile)

### ExecutiveSummary.jsx
- 6 Key-Zahlen Cards
- Laica Positionierungs-Text (Teal Gradient Box)
- Key Insights Bullet Points

### CompetitorTab.jsx
- Filter Buttons (Kategorie)
- 3-spaltige Grid (Desktop), responsive
- Karten mit Kategorie/Relevance Badges
- Klick → Modal mit vollständigen Details, Stärken/Schwächen Liste, Link

### PainPointsTab.jsx
- Sortiert nach Weight (absteigend)
- CSS Bar-Charts (animate)
- Quellen als Links unter jedem Item
- Klick → Modal mit Detailbeschreibung, Beispiel-Zitate, Laica-Relevance

### StudiesTab.jsx
- 4 Key-Numbers Cards oben (global SaaS, KI-Adoption, Buying Cycle, etc.)
- Tabelle/Karten mit allen 12 Studien
- Klick → Modal mit Findings, Key-Numbers, Deeplink zur Studie

### NewsTab.jsx
- Filter nach Kategorie (10 Buttons)
- Filter nach Sentiment (4 Badges: positiv/neutral/kritisch/warnung)
- Artikel-Karten: Source, Titel (Link), Datum, Sentiment Badge, Zitat
- Pain-Points Sektion: Gruppierungen mit Related Article Count
- Klick auf Pain-Point → Modal mit Article-Liste

### PartnersTab.jsx
- 3 Phasen visuell getrennt (farbliche Boxen)
- Karten mit Radar-Scores: Authority, Values Match, Reach (Balken 0-100)
- Klick → Modal mit Platforms/Reach, Examples, Why Alliance, Scores

### FundingTab.jsx
- Sortiert: URGENT (rot, countdown), ACTIVE (gelb), ONGOING (grün)
- Deadline-Countdown (Tage bis Deadline)
- Relevance Sterne (1-10)
- Type Badge (Bund/Land/EU)
- Klick → Modal mit Conditions, Amount, Application URLs, Details

### App.jsx
- Header mit Gradient (Teal/Cyan)
- ExecutiveSummary
- TabNav + dynamischer Tab-Content
- Footer mit Datum und Statistik

## Design

- **Farbschema:** Teal (#0a7490), Cyan (#06b6d4), Orange (#ff9f1c), Grau-Abstufungen
- **Typography:** System-Fonts (Inter fallback via Tailwind)
- **Layout:** Max-width Container (max-w-7xl), Responsive Grids
- **Shadows:** Subtle box-shadows auf Hover
- **Borders:** 1-2px borders, border-radius 0.5rem
- **Spacing:** 8px-based spacing system (py-2, gap-4, etc.)

## Technologie

- **Vite 8** mit React 19
- **Tailwind CSS v4** (via @tailwindcss/vite plugin)
- **Lucide React** für Icons
- **React Hooks** (useState) für State Management

## Build

```bash
npm run build
# Output: dist/ (352 KB, gzipped)
```

## Features

✓ Vollständige Datenbindung (19+10+12+52+20+20 Datenquellen)
✓ Responsive Design (Mobile, Tablet, Desktop)
✓ Modal-Popups für Details
✓ Filterbare Tabs
✓ Sentiment-basierte Artikel-Filterung
✓ Deadline-Countdown für Förderung
✓ Authority/Values/Reach Scoring für Partner
✓ Bar Charts für Pain Points und Budgets
✓ Tailwind-basierte Farbcodierung
✓ Print-freundlich (optional via CSS)

## Nächste Schritte

- Deploy zu Vercel/Netlify
- Analytics Integration (Google Analytics)
- Export PDF-Funktion
- Team-Sharing Features
- Auto-Update der Daten (API Integration)
