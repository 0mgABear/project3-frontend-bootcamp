import React from "react";
import { Avatar } from "@mui/material";
import { AuthButton } from "./AuthButton";
import AppLogo from "../components/applogo.png";
import { AppBar, Toolbar } from "@mui/material";
import "../css/App.css";

export function NavBar({ login }) {
  return (
    <AppBar sx={{ bgcolor: "common.white" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1600,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <img
          className="logo"
          alt="logo"
          src={AppLogo}
          sx={{ flexGrow: 1, flexShrink: 0, flexBasis: "auto" }}
        ></img>
        {login ? (
          <div>
            <input className="search-bar" placeholder="Search for people" />
            <Avatar />
            <AuthButton login={login} />
          </div>
        ) : (
          <>
            <AuthButton login={login} />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
