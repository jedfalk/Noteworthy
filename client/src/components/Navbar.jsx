import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Noteworthy</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <div className="navbar-nav ms-auto">
            {/* if user is logged in show saved books and logout */}
            {Auth.loggedIn() ? (
              <>
                <Link className="btn btn-outline-light me-2 my-1" to="/notes">My Notes</Link>
                <Link className="btn btn-outline-light me-2 my-1" onClick={Auth.logout}>Logout</Link>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2 my-1" to="/login">Login</Link>
                <Link className="btn btn-outline-light my-1" to="/signup">Sign Up</Link>
              </>
            )}
            <Link className="btn btn-outline-light my-1" to="/whiteboard">Whiteboard</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
