import React from "react";
import { AuthButton } from "./AuthButton";
import AppLogo from "../components/applogo.png";
import { Avatar, AppBar, Toolbar, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../css/App.css";
import { createTheme, ThemeProvider } from "@mui/system";

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
            <img
              src={AppLogo}
              alt="logo"
              style={{ width: "180px", height: "auto" }}
            />
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            <input sx={{ width: "100%" }} placeholder="Search for people" />
          </Grid>
        </Grid>
        {login ? (
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <Avatar />
            </Grid>
            <Grid item>
              <AuthButton login={login} />
            </Grid>
          </Grid>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
