import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from '../../../components/Header/Header';
import Logo from '../../../assets/logo.png';
import { Container, Typography, Button } from "@mui/material";
import styles from './DetailStay.module.css';


// funktion state react hooks

export default function DetailStay() {
  const { id } = useParams();
  const [stay, setStay] = useState(null);

  // henter data alle fra stays

  useEffect(() => {
    fetch("http://localhost:3042/stays")
      .then(res => res.json()) // til json data
      .then(data => {
        const foundStay = data.data.find(s => s._id === id); // ser om det passer med det id
        setStay(foundStay || null); // viser ophold eller null
      })
      .catch(err => console.error(err)); // fejl
  }, [id]);

  if (!stay) return <p>Ingen data</p>;

  // url srater med http

  const imageUrl = stay.image.startsWith('http')
    ? stay.image
    : `http://localhost:3042/stays/${stay.image}`;

    // sætter dynamisk baggrundsbillede via css variabel

    // hvis stay.includes findes og længden er større end 0 mapper den igennem includes og laver en li med item 

  return (
  <div>
    <div className={styles.container}>
      <div 
        className={styles.hero} 
        style={{ '--bg-image': `url(${imageUrl})` }}
      >
        <div className={styles.header}>
         <Link to="/"> <img src={Logo} alt="Logo" className={styles.logo} /></Link>
          <Header />
        </div>
        <h1 className={styles.heroTitle}>{stay.title}</h1>
      </div>

      <Container className={styles.content}>
        <Typography variant="h5" className={styles.subtitle}>
          Tag væk en weekend, med én du holder af
        </Typography>
        <Typography variant="body1" sx={{   fontFamily: 'Nanum Gothic', mb:4, mt:4, p:4} }>
          {stay.description}
        </Typography>

        {stay.includes && stay.includes.length > 0 && (
          <ul className={styles.includesList}>
            {stay.includes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}

        <Typography variant="h5"  sx={{  fontFamily: 'Nanum Gothic' }}>
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
>Book</Button>
      </Container>
    </div>
    </div>
  );
}