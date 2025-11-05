import { useEffect, useState } from "react";
import styles from './Review.module.css'


function ReviewCard({ name, review, stay, age }) {
  return (
    <div className={styles.reviewCard}>
      <h2>{name}</h2>
      <p><strong>Review:</strong> {review}</p>
      <p><strong>Stay:</strong> {stay}</p>
      <p><strong>Age:</strong> {age}</p>
    </div>
  );
}


function Review() {
  const [reviews, setReviews] = useState([]);

useEffect(() => {
  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:3042/reviews"); 
      const data = await res.json();
      setReviews(data.data);
    } catch (err) {
      console.error("Fejl ved hentning af reviews:", err);
    }
  };

  fetchReviews();
}, []);

  return (


    <div>
      {reviews.length > 0 ? (
        reviews.map((r) => (
          <ReviewCard
            key={r._id}
            name={r.name}
            review={r.review}
            stay={r.stay}
            age={r.age}
          />
        ))
      ) : (
        <p>Ingen reviews fundet.</p>
      )}
    </div>
  );
}

export default Review;
