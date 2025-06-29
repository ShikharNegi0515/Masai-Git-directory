import React, { useState } from 'react';

const ToggleButton = ({ label }) => {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(prev => !prev);
  };

  return (
    <button
      onClick={toggle}
      style={{
        color: isOn ? 'green' : 'red',
        fontSize: '18px',
        padding: '10px 20px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        background: '#f9f9f9',
        cursor: 'pointer',
      }}
    >
      {label && <span style={{ marginRight: '10px' }}>{label}</span>}
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
};

export default ToggleButton;
