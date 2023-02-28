import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { AddReviewDialog } from "./AddReviewDialog";

export function Profile({ user }) {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.picture) {
        setAvatar(user.picture);
      } else {
        setAvatar(null);
      }
    }
  });

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

      <AddReviewDialog user={user} />
    </div>
  );
}
