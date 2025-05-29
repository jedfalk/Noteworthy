import React from 'react';
import navbar from '../components/Navbar';
import login from '../components/Login';
import signup from '../components/Signup';

export default function Home() {
  return (
    <div>
      <navbar />
    <div className="text-center">
      <h1>Welcome to NoteSphere</h1>
      <p>Your personal space for notes, ideas, and inspiration.</p>
    </div>
    </div>
  );
}
