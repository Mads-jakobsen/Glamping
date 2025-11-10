import React from "react";
import { Box, Stack, Typography, Link } from "@mui/material";
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#2A4F57',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
        gap: '20px',
        color: '#fff',
      }}
    >
      
      <Stack direction="row" spacing={1}>
        <Link 
          href="https://www.facebook.com/" 
          target="_blank" 
          sx={{ fontSize: 40, color: '#fff', mx: 0.5 }}
        >
          <i className="fa-brands fa-square-facebook"></i>
        </Link>
        <Link 
          href="https://www.instagram.com/" 
          target="_blank" 
          sx={{ fontSize: 40, color: '#fff', mx: 0.5 }}
        >
          <i className="fa-brands fa-instagram"></i>
        </Link>
      </Stack>

      
      <Stack direction="row" spacing={1} alignItems="center">
        <Box 
          component="img" 
          src={logo} 
          alt="Gittes Glamping"
          sx={{ height: 35 }}
        />
        <Typography>
          Gittes Glamping
        </Typography>
      </Stack>
    </Box>
  );
}