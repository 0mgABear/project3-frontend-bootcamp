import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function Reviews() {
  const userIndex = useParams();
  const [userReviews, setUserReviews] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${userIndex.id}/reviews`)
      .then((response) => {
        setUserReviews(response.data);
      });
  }, [userIndex.id]);

  return (
    <div>
      {userReviews.map((review) => {
        <p key={review.id}>Review: {review.description}</p>;
      })}
    </div>
  );
}
