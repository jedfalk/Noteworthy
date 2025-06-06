import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Notes from './pages/Notes';
import NotFound from './pages/NotFound';
import Whiteboard from '../src/components/Whiteboard';

function App() {
  return (
    <div>
      <Navbar />
      <div className="login-background py-4">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/whiteboard" element={<Whiteboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
