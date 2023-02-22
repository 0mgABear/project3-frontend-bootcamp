import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/App.css";
import { Button } from "@mui/material";

export const AuthButton = ({ login }) => {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <Button
      variant="Contained"
      sx={{
        bgcolor: "#1E90FF",
        color: "#FFFFFF",
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "150px",
      }}
      onClick={login ? logout : loginWithRedirect}
    >
      {login ? "Sign Out" : "Log In"}
    </Button>
  );
};
