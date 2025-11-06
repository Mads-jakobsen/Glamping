import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export function ReviewCard({ name, review, stay, age }) {
  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        backgroundColor: "#829B97",
        color: "#FFF",
        textAlign:"center"
        
      
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, fontFamily:"zen-loop" }}>
        {name}
      </Typography>

      <Typography variant="body1" fontFamily={"zen-loop"}>
        <strong>Review:</strong> {review}
      </Typography>
      <Typography variant="body2" fontFamily={"zen-loop"}>
        <strong>Stay:</strong> {stay}
      </Typography>
      <Typography variant="body2" fontFamily={"zen-loop"}>
        <strong>Age:</strong> {age}
      </Typography>
    </Box>
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
<Box sx={{ p: 3 }}>


  

      <Box
        sx={{
          mb: 3,
          p: 2,
          borderRadius: 2,
          backgroundColor: "#C5B496",
          color: "#FFF",
          textAlign:"center",
        }}
      >

        <Typography>Vores gæster udtaler</Typography>
      </Box>


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
        <Typography variant="body1">Ingen reviews fundet.</Typography>
      )}
    </Box>
  );
}

export default Review;

