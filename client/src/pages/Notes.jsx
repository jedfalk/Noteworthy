import React from 'react';
import Whiteboard from '../components/Whiteboard';

export default function Notes() {
  return (
    <div className="container">
      <h2>Your Notes</h2>
      <p>Notes will be fetched and displayed here using GraphQL.</p>
      <Whiteboard />
    </div>
  );
}
