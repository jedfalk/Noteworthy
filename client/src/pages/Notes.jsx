// client/src/pages/Notes.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_NOTE } from '../utils/mutations';
import Auth from '../utils/auth';
import './Pages.css';

export default function Notes() {
  
  const [title, setTitle] = useState('');
  const [body, setBody]   = useState('');
  const [addNote, { loading, error, data }] = useMutation(ADD_NOTE);

  
  if (!Auth.loggedIn()) {
    window.location.assign('/login');
    return null;
  }

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
          <textarea
            id="note-body"
            rows="8"
            className="form-control"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your note..."
            required
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
          <p><strong>Body:</strong> {data.addNote.body}</p>
          <small>Created At: {new Date(data.addNote.createdAt).toLocaleString()}</small>
        </div>
      )}
    </div>
  );
}
