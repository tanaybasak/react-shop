import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  let navigate = useNavigate();


  const login = () => {
    navigate(`/products`);
  };

  return (
    <>
      <button className="login-btn" onClick={login}>
        Login
      </button>
    </>
  );
}

export default Home;
