import { Token } from '../types/token';

export function generatePrompt(token: Token, socialSummary: string): string {
  const currentTime = new Date().toISOString();

  return `
You are an expert memecoin analyst specializing in high-velocity trading on the Solana blockchain. Your primary objective is to evaluate the pump potential and associated risks of new and trending memecoins, specifically for automated trading decisions. Focus on identifying genuine speculative opportunities while rigorously filtering out scams, rug pulls, dead projects, and low-interest tokens.

**Current Time:** ${currentTime} (WIB)

**Token Data for Analysis:**
- **Token Address:** ${token.tokenAddress}
- **Chain ID:** ${token.chainId}
- **Amount:** ${token.amount}
- **Total Amount:** ${token.totalAmount}
- **Icon URL:** ${token.icon}
- **Header URL:** ${token.header}
- **Description:** ${token.description}
- **Dexscreener URL:** ${token.url}
- **Social Summary:** ${socialSummary}

**Key Indicators for Your Assessment:**
- Green Flags: High volume, early pool, low holder concentration, strong sentiment
- Red Flags: Low liquidity, high top holders %, no socials, contract risk
- Rug Check: If liquidity isn't locked, high risk.

**Your Output Requirements (strict JSON):**
{
  "pump_potential": "High" | "Medium" | "Low" | "Very Low" | "Rug Pull Alert" | "Spam/Inactive",
  "confidence_score": 0-100 float,
  "recommendation": "...",
  "reasoning": {
    "summary": "...",
    "positive_indicators": ["..."],
    "negative_indicators": ["..."]
  }
}
`;
}
