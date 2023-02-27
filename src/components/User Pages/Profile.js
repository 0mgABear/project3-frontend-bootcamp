import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";

export function Profile({ user }) {
  const [avatar, setAvatar] = useState(null);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (user) {
      if (user.picture) {
        setAvatar(user.picture);
      } else {
        setAvatar(null);
      }
    }
  });

  const addReview = () => {};

  return (
    <div className="profile">
      <Avatar src={avatar} />

      <div className="info">
        <p>
          <span>Name: </span>
          {user.firstName} {user.lastName}
        </p>
        <p>
          <span>Current Company:</span> {user.company}
        </p>
      </div>
      <button className="add-review" onClick={addReview}>
        Add Review
      </button>
    </div>
  );
}
