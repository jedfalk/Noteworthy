import React, { useState, useRef } from 'react';

const NoteEditor = () => {
  const [highlighting, setHighlighting] = useState(false);
  const noteRef = useRef(null);

  const handleHighlight = () => {
    if (!highlighting) return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    if (!noteRef.current.contains(range.commonAncestorContainer)) return;

    const span = document.createElement('span');
    span.style.backgroundColor = 'yellow';
    span.textContent = selection.toString();

    range.deleteContents();
    range.insertNode(span);
    selection.removeAllRanges();
  };

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <button onClick={() => setHighlighting(!highlighting)}>
        {highlighting ? 'Stop Highlighting' : 'Highlight'}
      </button>

      <div
        ref={noteRef}
        contentEditable
        onMouseUp={handleHighlight}
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          minHeight: '150px',
          width: '400px',
        }}
      >
        Select text and click "Highlight" to activate.
      </div>
    </div>
  );
};

export default NoteEditor;

