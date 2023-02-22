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
import { User } from "./components/User";
import PrivateRoute from "./components/PrivateRoutes";
import { useAuth0 } from "@auth0/auth0-react";
import "../src/css/App.css";
import { Typography } from "@mui/material";
import { AppFooter } from "./components/Footer";

function RequireAuth({ isAuthenticated, children }) {
  const location = useLocation();
  // if (!isAuthenticated) {
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }
  return children;
}

function App() {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);

  return (
    <div className="main">
      <NavBar login={isAuthenticated} />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact index element={<HomePage />} />
          <Route
            path="/users/:id"
            exact
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <User />
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
