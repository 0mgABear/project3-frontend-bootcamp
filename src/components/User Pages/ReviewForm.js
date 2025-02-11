import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

export const ReviewForm = (props) => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [review, setReview] = useState("");
  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    const reviewData = {
      revieweeId: id,
      reviewerId: props.currentLoggedInUser[0].id,
      description: review,
      rating: 3,
    };
    axios.post(
      `${process.env.REACT_APP_API_SERVER}/user/postreview`,
      reviewData
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your review of {props.user} here:{" "}
        <input
          key="reviewInput"
          type="text"
          name="review"
          value={review}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};
