import React, { useEffect, useState } from 'react';

const MarketTicker = ({ pair }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('wss://ws.kraken.com');
    ws.onopen = () => {
      ws.send(JSON.stringify({
        event: "subscribe",
        pair: [pair],
        subscription: { name: "ticker" }
      }));
    };
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (Array.isArray(data) && data[1]?.c) {
        setPrice(data[1].c[0]);
      }
    };
    return () => ws.close();
  }, [pair]);

  return (
    <div>
      <h2>{pair} Price</h2>
      <p>{price ? `$${parseFloat(price).toFixed(2)}` : 'Loading...'}</p>
    </div>
  );
};

export default MarketTicker;
