import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { FormDialog } from "./AddReviewDialog";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

function ProfileEditForm({ user, onClose, onUserUpdate }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [company, setCompany] = useState(user.company);
  const [count, setCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`${process.env.REACT_APP_API_SERVER}/users/${user.id}`, {
        firstName,
        lastName,
        company,
      })
      .then((response) => {
        onClose();
      })
      .catch((error) => {
        console.error(error);
        onClose();
      });
    setCount(count + 1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Company:
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export function Profile({ user, currentLoggedInUser, userIndex }) {
  const [avatar, setAvatar] = useState(null);
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const [count, setCount] = useState(0);

  const handleEdit = () => {
    setEdit(true);
    setCount(count + 1);
  };

  const handleCloseEdit = () => {
    setEdit(false);
  };

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
      <FormDialog user={user} />
      {currentLoggedInUser[0].id === userIndex && (
        <button onClick={handleEdit}>Edit</button>
      )}

      {edit && (
        <div>
          <ProfileEditForm
            user={user}
            onClose={handleCloseEdit}
            count={count}
          />
        </div>
      )}
    </div>
  );
}
