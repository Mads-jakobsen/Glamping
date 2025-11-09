import React, { useEffect, useState } from "react";
import styles from './MyPage.module.css'
import Header from "../Header/Header";
import Logo from '../../assets/logo.png'
import { Box, Typography } from "@mui/material";

export default function MyPage({ token, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [likedActivities, setLikedActivities] = useState([]);

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
    // Fjern aktiviteten fra likedActivities state
    setLikedActivities((prev) =>
      prev.filter((activity) => activity._id !== activityId)
    );

    // Fjern aktiviteten fra localStorage
    const likes = JSON.parse(localStorage.getItem("likes")) || {};
    delete likes[activityId];
    localStorage.setItem("likes", JSON.stringify(likes));
  };

  return (
    <>


<div>
     <div className={styles.backgroundMyPage}>
             
             <div className={styles.MyLogo}>
               
               <img src={Logo} alt="Logo" className={styles.logo} />
     
               
               <Header />
             </div>
     
             <h1 className={styles.h1MyPage}>Min liste</h1>
           </div>
            <Box
      sx={{
        p: 2,
        
        
        backgroundColor: "#33626C",
        color: "#FFF",
        textAlign:"center"
        
      
      }}

    >

<Typography variant="h5">Antal aktiviteter på listen</Typography>

    </Box>


      
      <div>
        
      

       

        
        {likedActivities.length > 0 ? (
          <ul>
            {likedActivities.map((a) => (
              <li key={a._id}>
             {a.title || "Ingen titel"} {" "}
  {a.image ? (
    <img 
      src={a.image} 
      alt={a.title || "Billede"} 
      className={styles.likeImage}
    />
  ) : (
    "Ingen billede"
  )}{" "}
  <button onClick={() => removeLike(a._id)}>Fjern like</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Du har ikke liket nogen aktiviteter endnu.</p>
        )}
        
         <button onClick={handleLogout}>Log ud</button>
      </div>
      
      </div>
    </>
  );
}