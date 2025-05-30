import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Noteworthy</Link>
        <div>
          <Link className="btn btn-outline-light me-2" to="/notes">My Notes</Link>
          <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
          <Link className="btn btn-outline-light" to="/signup">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}
