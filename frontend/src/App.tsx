import { useEffect, useState } from 'react';

export interface Link {
  type?: string | null;
  label?: string | null;
  url: string;
}

interface TokenResponse {
  url: string;
  chainId: string;
  tokenAddress: string;
  amount: number;
  totalAmount: number;
  icon: string;
  header: string;
  description: string;
  links?: Link[] | null;
}

function App() {
  const [tokens, setTokens] = useState<TokenResponse[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/tokens')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTokens(data);
      });
  }, []);

  if (!tokens) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🚀 Boosted Memecoins</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tokens.map((token, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-4 border border-gray-200 max-w-lg mx-auto">
            <img src={token.header} alt="Header" className="w-full rounded-md mb-4" />

            <div className="flex items-center gap-3 mb-2">
              <img src={token.icon} alt="Icon" className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-bold text-lg">{token.tokenAddress}</p>
                <p className="text-sm text-gray-500">Chain: {token.chainId}</p>
              </div>
            </div>

            <p className="mb-2 text-sm text-gray-700">{token.description}</p>

            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <p>💰 Amount: {token.amount}</p>
              <p>📊 Total: {token.totalAmount}</p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-1">🔗 Links:</h4>
              <ul className="space-y-1">
                {(token.links ?? []).map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {link.label ?? 'Link'} ({link.type ?? 'Other'})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
