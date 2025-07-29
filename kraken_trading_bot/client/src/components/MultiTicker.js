import React, { useEffect, useState } from 'react';
import AnimatedValue from './AnimatedValue';


const pairs = {
  XMRUSD: 'XMR/USD',
  ETHUSD: 'ETH/USD',
  XBTUSD: 'XBT/USD', // Kraken uses XBT for Bitcoin
};

const MultiTicker = () => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const ws = new WebSocket('wss://ws.kraken.com');

    ws.onopen = () => {
      ws.send(JSON.stringify({
        event: 'subscribe',
        pair: Object.values(pairs),
        subscription: { name: 'ticker' },
      }));
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (Array.isArray(data) && data[1]?.c) {
        const pair = data[3]; // e.g., "XMR/USD"
        setPrices(prev => ({
          ...prev,
          [pair]: data[1].c[0],
        }));
      }
    };

    return () => ws.close();
  }, []);

  return (
    
    <div style={{ marginTop: '2rem' }}>
      <h2>Live Ticker Prices</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Object.entries(pairs).map(([key, label]) => (
          <li key={key} style={{ margin: '10px 0', fontSize: '1.2rem' }}>
            <strong>{label}:</strong>{' '}
            <AnimatedValue value={`$${parseFloat(prices[label]).toFixed(2)}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiTicker;