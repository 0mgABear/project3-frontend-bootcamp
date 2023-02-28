import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const UserReviews = () => {
  const userIndex = useParams();
  const [userReviews, setUserReviews] = useState([]);
  const [reviewer, setReviewer] = useState({});
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

  useEffect(() => {
    userReviews.map((review) => {
      axios
        .get(`${process.env.REACT_APP_API_SERVER}/users/${review.reviewerId}`)
        .then((res) => {
          const newReviewer = {
            first_name: res.data.firstName,
            last_name: res.data.lastName,
            company: res.data.company,
          };
          setReviewer((prevReviewer) => ({
            ...prevReviewer,
            [review.reviewerId]: newReviewer,
          }));
        })
        .catch((err) => console.log(err));
    });
  }, [userReviews]);

  return (
    <div>
      {userReviews &&
        userReviews.map((review) => (
          <Card
            key={review.id}
            sx={{ backgroundColor: "#DDEFFF", marginBottom: "16px" }}
          >
            <CardContent>
              <p>
                Reviewed by: {reviewer[review.reviewerId]?.first_name}{" "}
                {reviewer[review.reviewerId]?.last_name} (Colleague at:{" "}
                {reviewer[review.reviewerId]?.company})
              </p>
              <p>{review.description}</p>
              <Rating value={review.rating} readOnly precision={0.5} />
              <DeleteOutlineIcon />
            </CardContent>
          </Card>
        ))}
    </div>
  );
};
