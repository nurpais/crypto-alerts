import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import type { Token } from '@/types/token';
import { useState } from 'react';
import { Button } from '../ui/button';

interface TokenCardProps {
  token: Token;
}

interface AIAnalysis {
  pump_potential: string;
  confidence_score: number;
  recommendation: string;
  reasoning: {
    summary: string;
    positive_indicators: string[];
    negative_indicators: string[];
  };
}

function HeaderPlaceholder() {
  return (
    <div className="w-full h-[150px] bg-gray-300 rounded-md flex items-center justify-center">
      <p className="text-neutral-500">Image not available</p>
    </div>
  );
}

export function TokenCard({ token }: TokenCardProps) {
  const { icon, header, description, tokenAddress, chainId, amount, totalAmount, links } = token;
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);

  const handleAnalyze = async (token: Token) => {
    setLoading(true);
    try {
      const res = await axios.post<AIAnalysis>('http://localhost:4000/analyze', {
        token,
      });

      setAnalysis(res.data);
    } catch (err) {
      console.error('AI analyze error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        {header ? (
          <img src={header} alt="Header" className="w-full rounded-md h-[150px] object-cover" />
        ) : (
          <HeaderPlaceholder />
        )}

        <div className="flex items-center gap-3 mb-2 mt-4">
          <img src={icon} alt="Icon" className="w-12 h-12 rounded-full overflow-hidden shrink-0" />
          <div className="grid">
            <p className="font-bold text-lg truncate">{tokenAddress}</p>
            <p className="text-sm text-gray-500">Chain: {chainId}</p>
          </div>
        </div>
        <CardDescription className="line-clamp-3 min-h-[60px]">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <p>💰 Amount: {amount}</p>
          <p>📊 Total: {totalAmount}</p>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-1">🔗 Links:</h4>
          <ul className="space-y-1">
            {(links ?? []).map((link, idx) => (
              <li key={idx}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {link.label ?? 'Link'} ({link.type ?? 'Other'})
                </a>
              </li>
            ))}
          </ul>
        </div>

        {analysis && (
          <div className="mt-4 text-sm border-t pt-3">
            <p>
              <strong>📊 Pump Potential:</strong> {analysis.pump_potential}
            </p>
            <p>
              <strong>💡 Confidence:</strong> {analysis.confidence_score}%
            </p>
            <p>
              <strong>📌 Recommendation:</strong> {analysis.recommendation}
            </p>
            <p>
              <strong>🧠 Summary:</strong> {analysis.reasoning.summary}
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>
                <strong>✅ Pros:</strong> {analysis.reasoning.positive_indicators.join(', ')}
              </li>
              <li>
                <strong>⚠️ Cons:</strong> {analysis.reasoning.negative_indicators.join(', ')}
              </li>
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button disabled={loading} onClick={() => handleAnalyze(token)}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </Button>
      </CardFooter>
    </Card>
  );
}
