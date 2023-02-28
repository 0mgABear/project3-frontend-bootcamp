import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserReviews } from "./User Pages/UserReviews";
import { Profile } from "./User Pages/Profile";
import "../css/User.css";
import { ReviewForm } from "./User Pages/ReviewForm";

export function UserPage({ currentLoggedInUser }) {
  const params = useParams();

  const { isAuthenticated } = useAuth0();
  const [user, setUser] = useState(null);
  const [userIndex, setUserIndex] = useState();
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
    if (user) {
      setUserFullName(`${user.firstName} ${user.lastName}`);
    }
  }, [user]);

  return (
    <div>
      {user ? (
        <div className="user">
          <Profile
            user={user}
            currentLoggedInUser={currentLoggedInUser}
            userIndex={userIndex}
          />

          <div>
            Reviews
            <UserReviews />
          </div>
          <ReviewForm
            user={userFullName}
            currentLoggedInUser={currentLoggedInUser}
          />
        </div>
      ) : (
        "Error: User not found"
      )}
    </div>
  );
}
