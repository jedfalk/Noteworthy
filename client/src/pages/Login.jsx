import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log('Login submitted');
    e.preventDefault();
    // Handle login logic here
    if(!email || !password) {
      alert('Please fill in both fields');
      return;
    }

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Redirect to notes page after successful login
    navigate('/notes');
  };

  return (
    <div className = "d-flex justify-content-center align-items-center vh-100 login-background">
      <div className="card shadow p-4" style={{minWidth: '350px'}}>
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
