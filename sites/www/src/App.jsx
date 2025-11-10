import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Styles from './App.module.css';
import Homepage from "./pages/Homepage/Homepage";
import Stays from "./pages/Stays/Stays";
import Activities from "./pages/Activities/Activities";
import Contact from "./pages/Contact/Contact";
import Weekend from "./components/Detail/DetailWeekend/DetailWeekend";
import GetAway from "./components/Detail/DetailGetaway/DetailGetaway";
import Family from "./components/Detail/DetailFamily/DetailFamily";
import Login from "./components/Login/Login/Login";
import MyPage from "./components/MyPage/MyPage";
import DetailStay from "./components/Detail/DetailStay/DetailStay";

export default function App() {
  const [token, setToken] = useState(null);

  // Hent token fra localStorage når appen mountes
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    
   <BrowserRouter>
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/Stays" element={<Stays />} />
    <Route path="/Activities" element={<Activities />} />
    <Route path="/Contact" element={<Contact />} />
   
    <Route path="/trip/:id" element ={<DetailStay /> } />
    


    

    
        <Route
          path="/login"
          element={<Login token={token} onLogin={handleLogin} />}
        />

        <Route
          path="/mypage"
          element={token ? <MyPage token={token} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

  <Footer />
</BrowserRouter>
  );
}