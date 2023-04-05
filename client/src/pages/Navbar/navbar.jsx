import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "./logo1.jpeg";
import "./navbar.css";

const Navbar = ({ isLogedIn, logOutHandler, isAdmin }) => {
  const navigate = useNavigate();
  const logOutfun = () => {
    // console.log("log out clicked..");
    logOutHandler();
    navigate("/login");
  };

  return (
    <div className="Navbar">
      <ul className="ul">
        <img src={logo} alt="Logo" width="120" height="75" className="logo" />
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>

        {isLogedIn && (
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        )}

        {isLogedIn ? (
          <>
            <li onClick={logOutfun}>LogOut</li>
          </>
        ) : (
          <>
            <li>
              <NavLink activeClassName="active" to="login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="register">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
