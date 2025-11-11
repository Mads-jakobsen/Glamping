import React, { useEffect, useState } from "react";
import styles from './MyPage.module.css';
import Header from "../Header/Header";
import Logo from '../../assets/logo.png';
import { Box, Typography, Button } from "@mui/material";
import {Link } from'react-router-dom'

export default function MyPage({ token, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [likedActivities, setLikedActivities] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const storedToken = token || localStorage.getItem("token");

    if (storedToken) {
      setUserData({
        name: "Bruger",
        email: "user@usermail.com",
      });
    }

    const likes = JSON.parse(localStorage.getItem("likes")) || {};
    const likedIds = Object.keys(likes);

    const fetchLikedActivities = async () => {
      try {
        const res = await fetch("http://localhost:3042/activities");
        const result = await res.json();
        const allActivities = result.data || [];

        const liked = allActivities.filter((a) => likedIds.includes(a._id));
        setLikedActivities(liked);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLikedActivities();
  }, [token]);

  if (!token && !localStorage.getItem("token")) {
    return <p>Du skal være logget ind for at se denne side.</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  const removeLike = (activityId) => {
    setLikedActivities((prev) =>
      prev.filter((activity) => activity._id !== activityId)
    );

    const likes = JSON.parse(localStorage.getItem("likes")) || {};
    delete likes[activityId];
    localStorage.setItem("likes", JSON.stringify(likes));
  };

  const toggleAccordion = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
                      💙
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