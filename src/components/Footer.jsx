import { Typography } from "@mui/material";

export function AppFooter() {
  return (
    <footer
      style={{
        backgroundColor: "#f0f8ff",
        padding: "20px",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <Typography variant="caption" color="textSecondary">
        © 2023 WorkPal | All Rights Reserved | Privacy Policy | Terms of Use |
        Cookie Policy
      </Typography>
    </footer>
  );
}
