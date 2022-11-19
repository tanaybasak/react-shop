import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const login = () => {
    navigate('/products');
  };

  return (
    <button className="login-btn" onClick={login} type="button">
      Login
    </button>
  );
}

export default Home;
