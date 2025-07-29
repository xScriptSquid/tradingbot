import React from 'react';

const PnLTracker = ({ totalPnL, trades, unrealizedPnL }) => {
  const styles = {
    container: {
      marginTop: '2rem',
      textAlign: 'center',
    },
    card: {
      display: 'inline-block',
      padding: '1.5rem 2rem',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      minWidth: '320px',
    },
    title: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#333',
    },
    stat: {
      fontSize: '1.1rem',
      margin: '0.5rem 0',
      color: '#444',
    },
    positive: { color: '#28a745' },
    negative: { color: '#dc3545' },
  };

  const formatPnL = (value) => {
    const isPositive = parseFloat(value) >= 0;
    return (
      <span style={isPositive ? styles.positive : styles.negative}>
        {isPositive ? '+' : '-'}${Math.abs(value).toFixed(2)}
      </span>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>PnL Tracker</h2>
        <p style={styles.stat}>Total PnL: {formatPnL(totalPnL)}</p>
        <p style={styles.stat}>Unrealized PnL: {formatPnL(unrealizedPnL)}</p>
        <p style={styles.stat}>Trades Executed: {trades}</p>
      </div>
    </div>
  );
};

export default PnLTracker;
