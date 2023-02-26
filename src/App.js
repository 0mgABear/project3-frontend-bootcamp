import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { NavBar } from "./components/NavBar";
import { UserPage } from "./components/User";
import PrivateRoute from "./components/PrivateRoutes";
import { useAuth0 } from "@auth0/auth0-react";
import "../src/css/App.css";
import { Typography } from "@mui/material";
import { AppFooter } from "./components/Footer";
import { useEffect } from "react";
import axios from "axios";

function RequireAuth({ isAuthenticated, children }) {
  const location = useLocation();
  if (!isAuthenticated) {
    // return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const { isAuthenticated, user } = useAuth0();
  console.log(isAuthenticated);
  console.log(user);

  useEffect(() => {
    if (isAuthenticated) {
      const userData = {
        firstName: "first name",
        lastName: "last name",
        email: user.email,
        company: "company name",
      };
      axios.post(`${process.env.REACT_APP_API_SERVER}/users`, userData);
    }
  }, [isAuthenticated, user]);

  return (
    <div className="main">
      <BrowserRouter>
        <NavBar login={isAuthenticated} />

        <Routes>
          <Route path="/" exact index element={<HomePage />} />
          <Route
            path="/users/:id"
            exact
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <UserPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      <AppFooter />
    </div>
  );
}

export default App;
