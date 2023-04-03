import React from "react";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./signin.css";

const Signin = ({ isLogedIn, isLogedinHandler, adminHandler }) => {
  const address = useAddress();
  const connect = useMetamask();

  // console.log("Hello from signin");

  const handleSubmission = async () => {
    await connect();
    console.log("address", address);
    // console.log(typeof address);

    if (address != undefined) {
      isLogedinHandler();

      // check for admin in backend
      let isadmin = false;

      if (isadmin == true) adminHandler();
    }
  };

  return (
    <div className="login">
      {isLogedIn && <Navigate to="/" replace={true} />}
      <div className="heading">Sign In Page</div>
      <button className="btn" onClick={handleSubmission}>
        Sign In With MetaMask
      </button>
    </div>
  );
};

export default Signin;
