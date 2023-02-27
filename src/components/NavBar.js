import React, { useEffect, useState } from "react";
import { AuthButton } from "./AuthButton";
import AppLogo from "../components/applogo.png";
import {
  Avatar,
  AppBar,
  Toolbar,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const { user, isAuthenticated } = useAuth0();
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (user) {
      setAvatar(user.picture);
    }
  }, [isAuthenticated, user]);

  const SearchBar = () => {
    const [value, setValue] = useState(null);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API_SERVER}/users`)
        .then((response) => {
          setUsers(response.data);
        });
    }, []);

    return (
      <Autocomplete
        sx={{ maxWidth: 400, marginLeft: 10 }}
        options={users}
        getOptionLabel={(user) => `${user.firstName} ${user.lastName}`}
        renderInput={(params) => (
          <TextField {...params} label="Search for profiles" />
        )}
        onChange={(event, newValue) => {
          if (newValue) {
            navigate(`/users/${newValue.id}`);
          }
        }}
      />
    );
  };

  return (
    <AppBar sx={{ bgcolor: "common.white" }}>
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item sx={{ marginRight: 2 }}>
            <Link to={"/"}>
              <img
                src={AppLogo}
                alt="logo"
                style={{ width: "180px", height: "auto" }}
              />
            </Link>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            {isAuthenticated ? <SearchBar /> : null}
          </Grid>
        </Grid>
        {isAuthenticated ? (
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <Avatar src={avatar} />
            </Grid>
            <Grid item>
              <AuthButton login={isAuthenticated} />
            </Grid>
          </Grid>
        ) : (
          <AuthButton login={isAuthenticated} />
        )}
      </Toolbar>
    </AppBar>
  );
}
