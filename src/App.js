import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { NavBar } from "./components/NavBar";
import { UserPage } from "./components/User";
import { useAuth0 } from "@auth0/auth0-react";
import "../src/css/App.css";
import { AppFooter } from "./components/Footer";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function RequireAuth({ isAuthenticated, children }) {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const { isAuthenticated, user } = useAuth0();
  useEffect(() => {
    if (user) {
      const userData = {
        firstName: user.family_name,
        lastName: user.given_name,
        email: user.email,
        company: "nil",
      };
      axios.post(`${process.env.REACT_APP_API_SERVER}/users`, userData);
    }
  }, [isAuthenticated, user]);

  return (
    <div className="main">
      <BrowserRouter>
        <NavBar
          login={isAuthenticated}
          currentLoggedInUser={currentLoggedInUser}
        />

        <Routes>
          <Route
            path="/"
            exact
            index
            element={<HomePage currentLoggedInUser={currentLoggedInUser} />}
          />
          <Route
            path="/users/:id"
            exact
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <UserPage currentLoggedInUser={currentLoggedInUser} />
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
