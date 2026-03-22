# ClauseGuard — AI Contract Risk Analyzer

![Version](https://img.shields.io/badge/version-1.0.0-e11d48?style=flat-square)
![License](https://img.shields.io/badge/license-ISC-e11d48?style=flat-square)
![Chrome](https://img.shields.io/badge/Chrome-Manifest%20V3-e11d48?style=flat-square&logo=googlechrome&logoColor=white)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)

> Analyze contracts with AI — get instant risk scores, plain English explanations, clause-by-clause breakdowns, and side-by-side contract comparisons.

<p align="center">
  <img src="public/icons/icon128.png" alt="ClauseGuard Icon" width="128" />
</p>

## Features

- :zap: **Quick Risk Scan** — Instant high-level risk assessment with overall risk score
- :mag: **Full Analysis** — Deep clause-by-clause breakdown with risk explanations
- :chart_with_upwards_trend: **Risk Scoring (1-10)** — Granular numeric risk rating for every clause and the overall contract
- :book: **Plain English Explain** — Translates legal jargon into simple, understandable language
- :balance_scale: **Contract Comparison** — Side-by-side diff of two contracts highlighting changes and risk deltas
- :link: **DocuSign Integration** — Pull contracts directly from DocuSign for analysis
- :link: **LegalZoom Integration** — Import LegalZoom documents
- :link: **PandaDoc Integration** — Analyze PandaDoc contracts in-place
- :link: **Google Docs Integration** — Analyze contracts from Google Docs
- :lock: **Firebase Auth** — Secure Google sign-in
- :hibiscus: **Rose/Dark Theme** — Elegant rose-accented dark interface

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript |
| Styling | Tailwind CSS, PostCSS, Autoprefixer |
| Build | Vite |
| Auth | Firebase |
| Integrations | DocuSign, LegalZoom, PandaDoc, Google Docs APIs |
| Platform | Chrome Extension (Manifest V3) |

## Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd contractlens-ext
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Create a `.env` file with Firebase credentials and integration API keys

4. **Build the extension**
   ```bash
   npm run build
   ```

5. **Load in Chrome**
   - Navigate to `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked** and select the `dist` folder

## Usage

### Quick Risk Scan
1. Open ClauseGuard from the Chrome toolbar
2. Paste a contract or pull one from a connected service
3. Click **Quick Scan** for an instant risk overview with a 1-10 score

### Full Analysis
1. Click **Full Analysis** for clause-by-clause risk breakdown
2. Each clause gets its own risk score, explanation, and recommendation
3. Use **Plain English** mode to translate any clause into simple language

### Contract Comparison
1. Load two contracts (original and revised)
2. ClauseGuard highlights additions, removals, and modifications
3. Risk delta shows how changes affect the overall risk profile

### Risk Score Guide

| Score | Level | Meaning |
|-------|-------|---------|
| **1-3** | Low Risk | Standard, fair terms |
| **4-6** | Medium Risk | Some clauses need attention |
| **7-8** | High Risk | Significant concerns present |
| **9-10** | Critical Risk | Strongly unfavorable terms |

## Architecture

```
contractlens-ext/
├── public/
│   └── icons/              # Extension icons (16, 48, 128px)
├── src/
│   ├── components/         # React UI components
│   │   ├── QuickScan/      # Quick risk assessment
│   │   ├── FullAnalysis/   # Clause-by-clause view
│   │   ├── Comparison/     # Contract diff tool
│   │   └── PlainEnglish/   # Jargon translator
│   ├── services/           # API integrations
│   │   ├── docusign/       # DocuSign connector
│   │   ├── legalizoom/     # LegalZoom connector
│   │   ├── pandadoc/       # PandaDoc connector
│   │   └── googledocs/     # Google Docs connector
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Risk scoring logic
│   └── App.tsx             # Main entry point
├── manifest.json           # Chrome Manifest V3 config
├── vite.config.ts          # Vite build configuration
├── tailwind.config.js      # Tailwind theme (rose/dark)
├── postcss.config.js       # PostCSS configuration
└── package.json
```

## Screenshots

<p align="center">
  <img src="public/icons/icon128.png" alt="ClauseGuard Icon" width="128" />
</p>

| Icon | Size |
|------|------|
| ![16px](public/icons/icon16.png) | 16x16 |
| ![48px](public/icons/icon48.png) | 48x48 |
| ![128px](public/icons/icon128.png) | 128x128 |

## License

ISC
