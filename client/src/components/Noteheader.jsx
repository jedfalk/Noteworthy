import React from 'react';

const Noteheader = ({ highlightMode, onToggleHighlight }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
    }}>
      <h2 style={{ margin: 0 }}>📝 NoteWorthy</h2>
      <button
        onClick={onToggleHighlight}
        style={{
          backgroundColor: highlightMode ? '#facc15' : '#e5e7eb',
          color: '#000',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 14px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        {highlightMode ? 'Exit Highlight' : 'Highlight'}
      </button>
    </div>
  );
};

export default Noteheader;





