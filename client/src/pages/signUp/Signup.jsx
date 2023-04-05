import React, { useState } from "react";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./signup.css";
import { useFile } from "../../context/index";

const signup = ({ isLogedIn, logedinHandler, adminHandler }) => {
  const [user, setUser] = useState({
    fname: "",
    uname: "",
    email: "",
  });

  const {
    fileData,
    addFileFunction,
    isAdminFunction,
    signInFunction,
    signUpFunction,
    newDownloadByUserFunction,
    adminAddFunction,
    filesUploadedbyAdmin,
    filesdownloadedbyUser,
  } = useFile();

  const address = useAddress();
  const connect = useMetamask();

  const userHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    // console.log(user);
    await connect();
    console.log("address", address);
    // console.log(typeof address);

    if (address != undefined) {
      let signup = await signUpFunction(
        address,
        user.fname,
        user.uname,
        user.email
      );

      let cc = await signup.receipt;

      console.log(cc);

      if (cc != undefined) {
        const signupuser = [user.fname, user.uname, user.email, address];
        console.log(signupuser);
        logedinHandler(signupuser);

        // check for admin in backend
        let isadmin = await isAdminFunction(address);
        console.log(isadmin, "SignUp admin");

        if (isadmin == true) await adminHandler();
      }
    }
  };

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
