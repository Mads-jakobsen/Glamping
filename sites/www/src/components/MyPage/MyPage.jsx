import React, { useEffect, useState } from "react";
import styles from './MyPage.module.css';
import Header from "../Header/Header";
import Logo from '../../assets/logo.png';
import { Box, Typography, Button } from "@mui/material";
import {Link } from'react-router-dom'

// my page funktion der modtager props token og onlogout  state og react hooks 

export default function MyPage({ token, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [likedActivities, setLikedActivities] = useState([]);
  const [expanded, setExpanded] = useState({});


  // tjekker om der er en token hvis der er, er bruger logget ind

  useEffect(() => {
    const storedToken = token || localStorage.getItem("token");

    if (storedToken) {
      setUserData({
        name: "Bruger",
        email: "user@usermail.com",
      });
    }

    const likes = JSON.parse(localStorage.getItem("likes")) || {}; // henter likes hvis der er nogle ellers vises ingen  
    const likedIds = Object.keys(likes); // dem som er likeet

    // henter

    const fetchLikedActivities = async () => {
      try {
        const res = await fetch("http://localhost:3042/activities"); // henter alle
        const result = await res.json(); // json data
        const allActivities = result.data || [];

        const liked = allActivities.filter((a) => likedIds.includes(a._id)); //tjekker om dem der er liket er der og viser kun dem
        setLikedActivities(liked); // opdater
      } catch (err) {
        console.error(err); // fejl ved fetch
      }
    };

    fetchLikedActivities(); // kalder funktion indenfor useeffect
  }, [token]); // køre når componeenten vises på siden første gang


// hvis ingen token er i state og localstorage kommer  besked

  if (!token && !localStorage.getItem("token")) {
    return <p>Du skal være logget ind for at se denne side.</p>;
  }

// fjerner token fra localstorage og logger ud

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  // Fjerner aktivitet fra liked

  const removeLike = (activityId) => {
    setLikedActivities((prev) =>
      prev.filter((activity) => activity._id !== activityId)
    );

    // fjerner aktivitet fra localstorage

    const likes = JSON.parse(localStorage.getItem("likes")) || {};
    delete likes[activityId];
    localStorage.setItem("likes", JSON.stringify(likes));
  };

  // tager et id og skifter mellem åben og lukket true og false

  const toggleAccordion = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };



  
  // mapper likedactivities igennem og viser keys activity_id hvert får et id
    //  hvis bruger har klikket på læs mere og expanded activity id er true viser den ellers ikke

  return (
    <>
    <div>
      <div className={styles.backgroundMyPage}>
        <div className={styles.MyLogo}>
          <Link to="/"> <img src={Logo} alt="Logo" className={styles.logo} /></Link>
          <Header />
        </div>

        <h1 className={styles.h1MyPage}>Min liste</h1>
        </div>

        <Box
          sx={{
            p: 5,
            backgroundColor: "#33626C",
            color: "#FFF",
            textAlign: "center"
          }}
        >
          <Typography variant="h5">Antal aktiviteter på listen: {likedActivities.length}</Typography>
        </Box>

        

        <div className={styles.activitiesContainer}>
          {likedActivities.length > 0 ? (
            likedActivities.map((activity) => (
              <div key={activity._id} className={styles.activityBox}>
                <div className={styles.imageWrapper}>
                  {activity.image && (
                    <img
                      src={activity.image}
                      alt={activity.name || activity.title}
                      className={styles.activityImage}
                    />
                  )}
                  <div className={styles.imageTopBox}>
                    {activity.title || "Ingen titel"}
                  </div>
                </div>

                <div className={styles.activityBlueBox}>
                  <div className={styles.activityHeader}>
                    <h3 className={styles.activityName}>
                      {activity.name || "Alle dage kl. 8:00 - 20:00"}
                    </h3>

                    <button
                      className={styles.likeButton}
                      onClick={() => removeLike(activity._id)}
                    >
                      🤍
                    </button>
                  </div>

                  <button
                    className={styles.accordionButton}
                    onClick={() => toggleAccordion(activity._id)}
                  >
                    {expanded[activity._id] ? "Læs mindre" : "Læs mere"}
                  </button>

                  {expanded[activity._id] && (
                    <p className={styles.activityDescription}>
                      {activity.description || "Ingen beskrivelse"}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Du har ikke liket nogen aktiviteter endnu.</p>
          )}
        </div>

  

<Button
  onClick={handleLogout}
  variant="contained"
  color="secondary"
  sx={{
m:5,
p:1,          
    borderRadius: '8px',
    backgroundColor: '#829B97',
    fontFamily: 'Zen Loop',
    
    '&:hover': {
      backgroundColor: '#6a7f78'
    }
  }}
>
  Log ud
</Button>
      
      </div>
    </>
  );
}