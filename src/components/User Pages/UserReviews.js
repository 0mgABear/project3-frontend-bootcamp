import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

export const UserReviews = () => {
  const userIndex = useParams();
  const [userReviews, setUserReviews] = useState();
  useEffect(() => {
    if (userIndex) {
      axios
        .get(
          `${process.env.REACT_APP_API_SERVER}/users/${userIndex.id}/reviews`
        )
        .then((response) => {
          setUserReviews(response.data);
        });
    }
  }, [userIndex]);

  return (
    <div>
      {userReviews &&
        userReviews.map((review) => (
          <Card
            key={review.id}
            sx={{ backgroundColor: "#DDEFFF", marginBottom: "16px" }}
          >
            <CardContent>
              <p>Review: {review.description}</p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};
