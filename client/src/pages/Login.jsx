// client/src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import './Pages.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // useMutation hook for LOGIN_USER
  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    try {
      // Call the loginUser mutation
      const { data } = await loginUser({
        variables: { email, password },
      });

      // Save the JWT via Auth.login
      Auth.login(data.login.token);

      // Redirect to /notes
      navigate('/notes');
    } catch (err) {
      console.error(err);
      setErrorMessage('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 px-3">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-dark mb-4 text-center">
          Please Login To Start Creating Your NoteWorthy
        </h2>
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
          <button
            type="submit"
            className="btn btn-primary w-100 custom-bth"
            disabled={loading}
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
          {errorMessage && (
            <p className="text-danger mt-2">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
