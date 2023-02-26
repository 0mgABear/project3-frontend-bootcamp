import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@mui/material";

const ReviewForm = (props) => {
  const { isAuthenticated, user } = useAuth0();
  const [review, setReview] = useState("");
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState();
  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const loggedInUserEmail = user.email;
  console.log(currentLoggedInUser);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_SERVER}/user?email=${loggedInUserEmail}`
      )
      .then((response) => {
        setCurrentLoggedInUser(response.data);
      });
  }, [loggedInUserEmail]);

  const handleSubmit = (event) => {
    const userIndex = props.userIndex;
    const reviewData = {
      revieweeId: userIndex,
      reviewerId: currentLoggedInUser[0].id,
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
      <input type="submit" value="submit" />
    </form>
  );
};

const UserReviews = (props) => {
  return (
    <div>
      {props.userReviews &&
        props.userReviews.map((review) => (
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

export function UserPage() {
  const params = useParams();
  const [accessToken, setAccessToken] = useState("");
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
    useAuth0();
  const [user, setUser] = useState(null);
  const [userIndex, setUserIndex] = useState();
  const [userReviews, setUserReviews] = useState();
  const [userFullName, setUserFullName] = useState("");

  if (userIndex !== params.id) {
    setUserIndex(params.id);
  }

  useEffect(() => {
    if (userIndex) {
      axios
        .get(`${process.env.REACT_APP_API_SERVER}/users/${userIndex}`)
        .then((response) => {
          setUser(response.data);
        });
    }
  }, [userIndex]);

  useEffect(() => {
    if (userIndex) {
      axios
        .get(`${process.env.REACT_APP_API_SERVER}/users/${userIndex}/reviews`)
        .then((response) => {
          setUserReviews(response.data);
        });
    }
  }, [userIndex]);

  useEffect(() => {
    if (user) {
      setUserFullName(`${user.firstName} ${user.lastName}`);
    }
  }, [user]);

  return (
    <div className="user-profile">
      {user ? (
        <div>
          <p>
            <b>Name:</b> {user.firstName} {user.lastName}
          </p>
          <p>
            <b>Company:</b> {user.company}
          </p>
          <div>
            <u>
              <b>Reviews</b>
            </u>
            <UserReviews userReviews={userReviews} />
          </div>
          <ReviewForm userIndex={userIndex} user={userFullName} />
        </div>
      ) : (
        "Error: User not found"
      )}
    </div>
  );
}
