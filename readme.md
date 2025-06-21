# 🧠 Crypto Memecoin Scanner + AI Analyzer

A fullstack application to scan trending Solana-based memecoins using the DexScreener API and analyze them using OpenAI (GPT-4).

---

## 📆 Tech Stack

- **Frontend:** React + Vite + TypeScript + TailwindCSS
- **Backend:** Node.js + Express + TypeScript
- **AI Engine:** OpenAI (GPT-4 API)
- **Data Source:** DexScreener (Boosted Tokens)

---

## 📁 Project Structure

```
/backend     → Express API (token scanner, AI analyzer)
/frontend    → React UI (token cards, fetch from backend)
/.env        → Environment variables
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/memecoin-scanner.git
cd memecoin-scanner
```

---

### 2. Run the Backend

```bash
cd backend
cp .env.example .env  # then add your API keys
npm install
npm run dev
```

`.env` example:

```env
PORT=4000
DEXSCREENER_API=https://api.dexscreener.com/token-boosts/latest/v1
OPENAI_API_KEY=sk-...
```

## ✅ Features

- 🔍 Fetch boosted tokens from DexScreener
- ⚙️ Filter by liquidity, market cap, pool age, volume, txns
- 🎨 Display tokens in a clean React UI
- 🤖 Analyze token pump potential using OpenAI GPT-4
- 📊 Return actionable trading signals (JSON)

---

## 📄 License

MIT
