import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_NOTE } from '../utils/mutations';
import Auth from '../utils/auth';
import './Pages.css';
import Noteheader from '../components/Noteheader.jsx';

export default function Notes() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [highlightMode, setHighlightMode] = useState(false);
  const [addNote, { loading, error, data }] = useMutation(ADD_NOTE);

  if (!Auth.loggedIn()) {
    window.location.assign('/login');
    return null;
  }

  const handleToggleHighlight = () => {
    setHighlightMode((prev) => !prev);
  };

  const handleMouseUp = () => {
    if (!highlightMode) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const selectedText = selection.toString();
    if (!selectedText.trim()) return;

    const markHTML = `<mark style="background-color: #facc15; border-radius: 3px; padding: 0 2px;">${selectedText}</mark>`;
    document.execCommand('insertHTML', false, markHTML);

    const editableDiv = document.getElementById('note-body');
    if (editableDiv) {
      editableDiv.focus();

      // Delay selection cleanup to avoid input glitches
      setTimeout(() => {
        const selection = window.getSelection();
        if (selection) selection.removeAllRanges();
        setBody(editableDiv.innerHTML);
      }, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    try {
      const result = await addNote({
        variables: { title, body },
      });
      if (result.data) {
        setTitle('');
        setBody('');
        console.log('Created note:', result.data.addNote);
      }
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };

  return (
    <div className="note-page-container container my-4">
      <Noteheader
        highlightMode={highlightMode}
        onToggleHighlight={handleToggleHighlight}
      />

      <h2 className="mb-3">Create a New Note</h2>

      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group mb-3">
          <label htmlFor="note-title" className="form-label">Title</label>
          <input
            id="note-title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title..."
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="note-body" className="form-label">Body</label>
          <div
            id="note-body"
            contentEditable
            suppressContentEditableWarning
            onMouseUp={handleMouseUp}
            onInput={(e) => setBody(e.currentTarget.innerHTML)}

            style={{
              border: '1px solid #ccc',
              borderRadius: '6px',
              padding: '10px',
              minHeight: '150px',
              backgroundColor: '#fff',
              whiteSpace: 'pre-wrap',
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving…' : 'Save Note'}
        </button>

        {error && (
          <p className="text-danger mt-2">Error: {error.message}</p>
        )}
      </form>

      {data && (
        <div className="note-preview card mt-4 p-3">
          <h4>Saved Note</h4>
          <p><strong>Title:</strong> {data.addNote.title}</p>
          <p><strong>Body:</strong><span>{data.addNote.body}</span></p>
          <small>Created At: {new Date(data.addNote.createdAt).toLocaleString()}</small>

        </div>
      )}

      <div className="container mt-4">
        <h2>Your Notes</h2>  
      </div>
    </div>
  );
}
