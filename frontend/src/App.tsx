import { useEffect, useState } from 'react';
import type { Token } from './types/token';
import { TokenCard } from './components/token/token-card';

function App() {
  const [tokens, setTokens] = useState<Token[] | null>(null);

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
          <TokenCard key={index} token={token} />
        ))}
      </div>
    </div>
  );
}

export default App;
