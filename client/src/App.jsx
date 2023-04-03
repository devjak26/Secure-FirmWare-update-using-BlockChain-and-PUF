import React, { useCallback, useState } from "react";
import "./App.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./pages/Navbar/navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages";
import Login from "./pages/signin/Signin";
import Register from "./pages/signUp/Signup";
import FileUpload from "./pages/FileUpload/FileUpload";
import SimpleTable from "./pages/table/SimpleTable";

const App = () => {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const logOutHandler = () => {
    setIsLogedIn(false);
    setIsAdmin(false);
  };

  const logedinHandler = () => {
    setIsLogedIn(true);
  };

  const adminHandler = () => {
    setIsAdmin(true);
  };

  return (
    <div className="App">
      <Router>
        <div className="navBar">
          <Navbar
            isLogedIn={isLogedIn}
            logoutHandler={logOutHandler}
            isAdmin={isAdmin}
          />
        </div>

        <div>
          <Routes>
            <Route path="/" element={<SimpleTable />} />

            <Route
              path="/login"
              element={
                <Login
                  isLogedIn={isLogedIn}
                  isLogedinHandler={logedinHandler}
                  adminHandler={adminHandler}
                />
              }
            />

            <Route
              path="/register"
              element={
                <Register
                  isLogedIn={isLogedIn}
                  isLogedinHandler={logedinHandler}
                  adminHandler={adminHandler}
                />
              }
            />

            <Route
              path="/fileUpload"
              element={<FileUpload isAdmin={isAdmin} />}
            />

            <Route
              path="/profile"
              element={<FileUpload isAdmin={isAdmin} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
