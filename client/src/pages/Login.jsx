import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in both fields');
      return;
    }

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    navigate('/notes');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 px-3">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-dark mb-4 text-center">Please Login To Start Creating Your NoteWorthy</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 custom-bth">Login</button>
        </form>
      </div>
    </div>
  );
}
