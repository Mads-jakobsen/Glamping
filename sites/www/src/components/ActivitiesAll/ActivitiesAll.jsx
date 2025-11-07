import React, { useState, useEffect } from "react";
import styles from './ActivitiesAll.module.css';

function ActivitiesAll() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [likes, setLikes] = useState({}); 

  useEffect(() => {
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

  const toggleAccordion = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
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
              {activity.title || "overskrift"}
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
                ❤️ {likes[activity._id] || 0}
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
    </div>
  );
}

export default ActivitiesAll;