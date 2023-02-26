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
import { makeStyles } from "@mui/styles";
import "../css/App.css";
import { createTheme, ThemeProvider } from "@mui/system";
import { BrowserRouter, Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [value, setValue] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/users`).then((response) => {
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

export function NavBar({ login, user }) {
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
            {login ? <SearchBar /> : null}
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center">
          <Grid item>{login ? <Avatar /> : null}</Grid>
          <Grid item>
            <AuthButton login={login} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
