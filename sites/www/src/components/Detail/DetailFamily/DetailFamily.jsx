import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from '../../../components/Header/Header';
import Logo from '../../../assets/logo.png';
import { Container, Typography, Button } from "@mui/material";
import styles from '../DetailStay/DetailStay.module.css'


export default function Family() {
  const { id } = useParams(); // react hook henter parameter fra url som er id
  const [stay, setStay] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3042/stays") // henter alle stay
      .then(res => res.json()) // json data
      .then(data => {
        const foundStay = data.data.find(s => s._id === id); // finder det der passer med id
        setStay(foundStay || null);
      })
      .catch(err => console.error(err));
  }, [id]); // ændres id henter den ny

  if (!stay) return <p>Ingen data</p>;

  // imageurl true hvis den starter med http

  const imageUrl = stay.image.startsWith('http')
    ? stay.image
    : `http://localhost:3042/stays/${stay.image}`;


    // --bg-image sætter baggrunds billede via css variabel

    // mui comoponenter

  return (
    <div className={styles.container}>
      
      
      <div className={styles.hero} style={{ '--bg-image': `url(${imageUrl})` }}> 
        <div className={styles.header}>
          <Link to="/"><img src={Logo} alt="Logo" className={styles.logo} /></Link>
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
          fontFamily:"Nanum Gothic"
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

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
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