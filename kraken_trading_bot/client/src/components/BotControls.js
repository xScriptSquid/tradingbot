import React from 'react';

const BotControls = ({
  isRunning,
  onStart,
  onStop,
  selectedStrategy,
  onStrategyChange,
  orderSize,
  setOrderSize,
  stopLoss,
  setStopLoss,
  takeProfit,
  setTakeProfit,
  onManualBuy,
  onManualSell,
  riskLimitEnabled,
  setRiskLimitEnabled
}) => {
  const strategies = ['Scalping', 'Trend Following', 'Grid Trading', 'Mean Reversion'];

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
      padding: '1.5rem 2rem',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'left',
      minWidth: '320px',
    },
    group: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontWeight: '600',
      color: '#444',
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '15px',
      backgroundColor: '#fff',
    },
    checkbox: {
      marginRight: '8px',
    },
    buttonRow: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '10px',
      marginTop: '1rem',
    },
    button: {
      flex: 1,
      padding: '10px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '6px',
      fontSize: '15px',
      cursor: 'pointer',
    },
    buyButton: {
      backgroundColor: '#28a745',
      color: 'white',
    },
    sellButton: {
      backgroundColor: '#dc3545',
      color: 'white',
    },
    startButton: {
      backgroundColor: '#007bff',
      color: 'white',
    },
    stopButton: {
      backgroundColor: '#6c757d',
      color: 'white',
    },
    status: {
      marginTop: '1rem',
      fontSize: '14px',
      color: '#555',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Trading Bot Controls</h2>
      <div style={styles.card}>
        <div style={styles.group}>
          <label style={styles.label}>Strategy:</label>
          <select
            value={selectedStrategy}
            onChange={(e) => onStrategyChange(e.target.value)}
            style={styles.input}
          >
            {strategies.map((strategy) => (
              <option key={strategy} value={strategy}>
                {strategy}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Order Size:</label>
          <input
            type="number"
            value={orderSize}
            onChange={(e) => setOrderSize(e.target.value)}
            min="0"
            step="0.01"
            style={styles.input}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Stop-Loss (%):</label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            min="0"
            step="0.1"
            style={styles.input}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Take-Profit (%):</label>
          <input
            type="number"
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value)}
            min="0"
            step="0.1"
            style={styles.input}
          />
        </div>

        <div style={styles.group}>
          <label>
            <input
              type="checkbox"
              checked={riskLimitEnabled}
              onChange={() => setRiskLimitEnabled(!riskLimitEnabled)}
              style={styles.checkbox}
            />
            Enable Risk Limit
          </label>
        </div>

        <div style={styles.buttonRow}>
          <button onClick={onManualBuy} style={{ ...styles.button, ...styles.buyButton }}>
            Buy
          </button>
          <button onClick={onManualSell} style={{ ...styles.button, ...styles.sellButton }}>
            Sell
          </button>
        </div>

        <div style={styles.buttonRow}>
          <button onClick={onStart} disabled={isRunning} style={{ ...styles.button, ...styles.startButton }}>
            Start Bot
          </button>
          <button onClick={onStop} disabled={!isRunning} style={{ ...styles.button, ...styles.stopButton }}>
            Stop Bot
          </button>
        </div>

        <p style={styles.status}>
          Status: <strong>{isRunning ? 'Running' : 'Stopped'}</strong>
        </p>
      </div>
    </div>
  );
};

export default BotControls;
