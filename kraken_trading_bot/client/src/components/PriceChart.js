import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const PriceChart = () => {
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState({
    'XBT/USD': null,
    'ETH/USD': null,
    'XMR/USD': null,
  });

  useEffect(() => {
    const ws = new WebSocket('wss://ws.kraken.com');

    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({
        event: 'subscribe',
        pair: ['XBT/USD', 'ETH/USD', 'XMR/USD'],
        subscription: { name: 'ticker' },
      }));
    };

    ws.onmessage = (msg) => {
      const parsed = JSON.parse(msg.data);
      if (Array.isArray(parsed) && parsed[1]?.c) {
        const pair = parsed[3];
        const price = parseFloat(parsed[1].c[0]);

        setPrices(prev => {
          const updated = { ...prev, [pair]: price };

          // Only update chart if all prices are available
          if (Object.values(updated).every(p => p !== null)) {
            const timestamp = new Date().toLocaleTimeString();
            setData(prevData => [
              ...prevData.slice(-19),
              {
                time: timestamp,
                BTC: updated['XBT/USD'],
                ETH: updated['ETH/USD'],
                XMR: updated['XMR/USD'],
              },
            ]);
          }

          return updated;
        });
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Live Price Chart</h2>
      <ResponsiveContainer width="95%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="BTC" stroke="#f7931a" dot={false} />
          <Line type="monotone" dataKey="ETH" stroke="#627eea" dot={false} />
          <Line type="monotone" dataKey="XMR" stroke="#ff6600" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
