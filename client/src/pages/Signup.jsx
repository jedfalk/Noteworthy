import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
   const navigate = useNavigate();

  const [signupUser, { error, data: mutationData }] = useMutation(SIGNUP_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
       const { data: signupData } = await signupUser({
        variables: {
          username: formState.name,
          email: formState.email,
          password: formState.password,
        },
      });

      Auth.login(signupData.signup.token);
      navigate('/notes');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 px-3">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h4 className="card-header bg-dark text-light p-2 text-center">Sign Up</h4>
        <div className="card-body">
          {mutationData ? (
            <p>
              Success! You may now head <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input mb-3 form-control"
                placeholder="Your username"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
              />
              <input
                className="form-input mb-3 form-control"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input mb-3 form-control"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                className="btn btn-block btn-info w-100"
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                Submit
              </button>
            </form>
          )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
