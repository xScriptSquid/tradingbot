import React, { useEffect, useState } from 'react';
import AnimatedValue from './AnimatedValue';

const mockBalances = {
  XXBT: '0.5234',  // Bitcoin
  ZUSD: '1543.25', // USD
  XETH: '2.1345',  // Ethereum
  USDT: '500.00',  // Tether
};

const BalanceDisplay = () => {
  const [balances, setBalances] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setBalances(mockBalances);
    }, 500);
  }, []);

  const assetDetails = {
    XXBT: { name: 'Bitcoin', icon: 'https://img.logokit.com/token/BTC' },
    XETH: { name: 'Ethereum', icon: 'https://img.logokit.com/token/ETH' },
    ZUSD: { name: 'US Dollar', icon: 'https://img.logokit.com/token/USDC' },
    USDT: { name: 'Tether', icon: 'https://img.logokit.com/token/USDT' },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Account Balances</h2>
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Asset</th>
              <th style={styles.th}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(balances).map(([asset, amount]) => {
              const { name, icon } = assetDetails[asset] || {};
              return (
                <tr key={asset}>
                  <td style={styles.td}>
                    <img
                      src={icon}
                      alt={asset}
                      style={{ width: '20px', verticalAlign: 'middle', marginRight: '8px' }}
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                    <strong>{name || asset}</strong> ({asset})
                  </td>
                  <td style={styles.td}>{amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: '#333',
  },
  card: {
    display: 'inline-block',
    padding: '1rem 2rem',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  th: {
    padding: '10px 20px',
    borderBottom: '2px solid #ccc',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#555',
  },
  td: {
    padding: '10px 20px',
    borderBottom: '1px solid #eee',
    color: '#333',
  },
};

export default BalanceDisplay;
