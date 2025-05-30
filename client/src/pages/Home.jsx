import React from 'react';
import Navbar from '../components/Navbar';


export default function Home() {
  return (
    <div>
      <Navbar />
    <div className="text-center">
      <h1>Welcome to NoteSphere</h1>
      <p>Your personal space for notes, ideas, and inspiration.</p>
    </div>
    </div>
  );
}
