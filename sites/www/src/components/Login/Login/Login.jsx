import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";


export default function Login({ token, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/mypage"); 
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "user@usermail.com" && password === "1234") {
      const fakeToken = "abc123";
      onLogin(fakeToken);
    } else {
      alert("Forkert email eller kode");
    }
  };

  return (
    <>
    <Header />
    <div >
      <h2 >Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />
        <input
          type="password"
          placeholder="Kode"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
        <button type="submit">
          Log ind
        </button>
      </form>
    </div>
    </>
  );
}