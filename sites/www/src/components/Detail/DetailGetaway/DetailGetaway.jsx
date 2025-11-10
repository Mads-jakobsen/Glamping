import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from '../../../components/Header/Header';
import Logo from '../../../assets/logo.png';
import { Container, Typography, Button } from "@mui/material";
import styles from '../DetailStay/DetailStay.module.css'

export default function GetAway() {
  const { id } = useParams();
  const [stay, setStay] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3042/stays")
      .then(res => res.json())
      .then(data => {
        const foundStay = data.data.find(s => s._id === id);
        setStay(foundStay || null);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!stay) return <p>Ingen data</p>;

  const imageUrl = stay.image.startsWith('http')
    ? stay.image
    : `http://localhost:3042/stays/${stay.image}`;

  return (
    <div className={styles.container}>
      
      <div className={styles.hero} style={{ '--bg-image': `url(${imageUrl})` }}>
        <div className={styles.header}>
          <img src={Logo} alt="Logo" className={styles.logo} />
          <Header />
        </div>

        <h1 className={styles.heroTitle}>{stay.title}</h1>
      </div>

      <Container
        sx={{
          textAlign: "center",
          backgroundColor: "#33626C",
          color: "white",
          borderRadius: 2,
          p: 4,
          fontFamily: "Nanum Gothic"
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontFamily: "Zen Loop" }}>
          Tag væk en weekend, med én du holder af
        </Typography>

        <Typography variant="body1" sx={{ fontFamily: "Zen Loop" }}>
          {stay.description}
        </Typography>

        {stay.includes && stay.includes.length > 0 && (
          <ul>
            {stay.includes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}

        <Typography variant="h6" gutterBottom sx={{ mt: 2, fontFamily: "Zen Loop" }}>
          Pris: {stay.price} DKK
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          href="/contact"
          sx={{ 
            mt: 3,
            p:2,
            borderTopLeftRadius:'25px',
            borderBottomRightRadius:'25px',
            paddingLeft:'30px',
            paddingRight:'30px',
            fontFamily:"Zen Loop",
            backgroundColor:"#829B97"
          }}
        >
          Book nu
        </Button>

      </Container>
    </div>
  );
}