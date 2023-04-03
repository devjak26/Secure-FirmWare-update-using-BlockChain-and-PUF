import React, { useState } from "react";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./signup.css";

const signup = ({ isLogedIn, isLogedinHandler, adminHandler }) => {
  const [user, setUser] = useState({
    fname: "",
    uname: "",
    email: "",
  });

  const address = useAddress();
  const connect = useMetamask();

  const userHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registerHandler = async() => {
    // console.log(user);
    await connect();
    console.log("address", address);
    // console.log(typeof address);

    if (address != undefined) {
      isLogedinHandler();

      // send data in backend
      

      // check for admin in backend
      let isadmin = false;

      if (isadmin == true) adminHandler();
  };
}

  return (
    <div className="signup">
      {isLogedIn && <Navigate to="/" replace={true} />}
      <h2 className="heading">Register Page</h2>

      <div className="register-form">
        <div className="input-container">
          <label>Name</label>
          <input type="text" name="fname" required onChange={userHandler} />
        </div>

        <div className="input-container">
          <label>User Name</label>
          <input type="text" name="uname" required onChange={userHandler} />
        </div>

        <div className="input-container">
          <label>Email</label>
          <input type="email" name="email" required onChange={userHandler} />
        </div>

        <div className="button-container">
          <button className="registerBtn" onClick={registerHandler}>
            Sign Up with Metamask
          </button>
        </div>
      </div>
    </div>
  );
};

export default signup;
