import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../Header/Header";
import Logo from '../../../assets/logo.png';
import { TextField, Button, Box, Typography, Snackbar, Alert } from "@mui/material";
import styles from '../Login/Login.module.css'

export default function Login({ token, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorOpen, setErrorOpen] = useState(false); 
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
      setErrorOpen(true); 
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setErrorOpen(false);
  };

  return (
    <div>
      <div className={styles.loginHeder}>
        <Link to="/"> <img className={styles.logo} src={Logo} alt="Logo" /></Link>
        <Header />
      </div>

      <div>
        <h3>Log ind på din bruger</h3>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: "100%",
            maxWidth: 400,
            margin: "0 auto",
            p: 5,
            mb: 8,
            mt: 8,
            border: "1px solid #ccc",
            borderRadius: 2,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Log ind
          </Typography>

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            name="email"
            required
            aria-required="true"
          />

          <TextField
            label="Kode"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            name="password"
            required
            aria-required="true"
          />

   <Button
  type="submit"
  variant="contained"
  fullWidth
  sx={{
    mt: 1,
    py: 1.5,
    backgroundColor: "#829B97",
      
  }}
>
  Log ind
</Button>
        </Box>
      </div>

    
      <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Forkert email eller kode
        </Alert>
      </Snackbar>
    </div>
  );
}