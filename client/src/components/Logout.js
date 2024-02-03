import React from 'react';
import useLocalState from '../utils/useLocalStorage';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const [token, setToken] = useLocalState('', 'token');

  function handleClick() {
    fetch('api/logout', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
    })
      .then(response => {
        if (!response.ok) {
          console.error('Logout failed:', response.statusText);
          throw new Error('Logout failed');
        }
        setToken('');
        window.location.href = 'login';
      })
      .catch(error => {
        alert(error);
      });
  }

  return <button onClick={handleClick}>Logout</button>;
}
