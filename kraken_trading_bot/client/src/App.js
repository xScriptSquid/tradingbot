import React from 'react';
import MultiTicker from './components/MultiTicker';
import BalanceDisplay from './components/BalanceDisplay';
import BotControls from './components/BotControls';
import PriceChart from './components/PriceChart';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Kraken Trading Bot</h1>

      <div style={styles.row}>
        <div style={styles.column}>
          <MultiTicker />
        </div>
        <div style={styles.column}>
          <BalanceDisplay />
        </div>
      </div>
      <BotControls />
      <PriceChart />
    </div>
  );
}

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
    marginTop: '2rem',
  },
  column: {
    flex: '1 1 300px',
    maxWidth: '400px',
  },
};

export default App;
