// Modules
import React from 'react';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import useLocalState from '../utils/useLocalStorage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  // generating login button for Google
  const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const googleLoginRes = await axios.post('/api/login/google', {
          token: tokenResponse.access_token,
        });
        navigate('/CatsCardsPage');
        // handle successful login here
      } catch (error) {
        // Handle errors
        console.error('Error from googleLogin:', error);
        // Check if the error response has the expected format
        if (error.response && error.response.data) {
          setErr(error.response.data);
        } else {
          // If the error format is not as expected, use a generic message
          setErr('An error occurred during the login process.');
        }
      }
    },
  });

  const [res, setRes] = useState(null);
  const [err, setErr] = useState(null);
  const [token, setToken] = useLocalState('', 'token');

  return (
    <>
      <div className='slogan-signup-login-container'>
        <h1 style={{ fontSize: 80 }}>Find the purrfect companion®</h1>

        <div className='signup-login-buttons'>
          <div>
            <Link to='/signup'>
              <button variant='contained'>Sign up</button>
            </Link>
          </div>

          <div>
            <Link to='/login'>
              <button variant='contained'>Log in</button>
            </Link>
          </div>
          <button className='google-login' onClick={() => googleLogin()}>
            Sign up/Log in with Google 🚀
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
