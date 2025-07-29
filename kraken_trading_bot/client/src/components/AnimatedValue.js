import React, { useEffect, useState } from 'react';

const AnimatedValue = ({ value }) => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);
    const timeout = setTimeout(() => setHighlight(false), 500);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <span style={{
      transition: 'background-color 0.5s ease',
      backgroundColor: highlight ? '#d1ffd6' : 'transparent',
      padding: '0 4px',
      borderRadius: '4px',
    }}>
      {value}
    </span>
  );
};

export default AnimatedValue;
