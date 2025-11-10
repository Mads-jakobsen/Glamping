import React, { useState, useEffect } from "react";
import styles from "./ActivitiesAll.module.css";
import { Link } from "react-router-dom";

function ActivitiesAll() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [likes, setLikes] = useState({});
  const [token, setToken] = useState(null);

  
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    setLikes(storedLikes);

    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    const fetchActivities = async () => {
      try {
        const res = await fetch("http://localhost:3042/activities");
        if (!res.ok) throw new Error("Netværksfejl: " + res.status);
        const result = await res.json();
        setActivities(result.data || []);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []); 

  

  const handleLike = (id) => {
  setLikes((prev) => {
    const newLikes = { ...prev, [id]: !prev[id] }; 
    localStorage.setItem("likes", JSON.stringify(newLikes));
    return newLikes;
  });
};

  const toggleAccordion = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.activitiesContainer}>
      {activities.map((activity) => (
        <div key={activity._id} className={styles.activityBox}>
          <div className={styles.imageWrapper}>
            {activity.image && (
              <img
                src={activity.image}
                alt={activity.name}
                className={styles.activityImage}
              />
            )}
            <div className={styles.imageTopBox}>
              {activity.title || "Overskrift"}
            </div>
          </div>

          <div className={styles.activityBlueBox}>
            <div className={styles.activityHeader}>
              <h3 className={styles.activityName}>
                {activity.name || "Alle dage kl. 8:00 - 20:00"}
              </h3>

           <button
  className={styles.likeButton}
  onClick={() => handleLike(activity._id)}
>
  <span className={styles.heart}>
    {likes[activity._id] ? "💙" : "🤍"}
  </span>
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
                {activity.description || "No Description"}
              </p>
            )}
          </div>
        </div>
      ))}

      <div className={styles.linkWrapper}>
        {token ? (
          <Link to="/mypage" className={styles.linkButton}>
            Gå til min side
          </Link>
        ) : (
          <Link to="/login" className={styles.linkButton}>
            Log ind for at se din liste
          </Link>
        )}
      </div>
    </div>
  );
}

export default ActivitiesAll;