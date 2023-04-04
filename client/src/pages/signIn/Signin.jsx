import React from "react";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./signin.css";
import { useFile } from "../../context/index";

const Signin = ({ isLogedIn, logedinHandler, adminHandler }) => {
  const address = useAddress();
  const connect = useMetamask();

  // console.log("Hello from signin");
  const {
    fileData,
    addFileFunction,
    isAdminFunction,
    signInFunction,
    signUpFunction,
    newDownloadByUserFunction,
    adminAddFunction,
    filesUploadedbyAdmin,
    filesdownloadedbyUser
  } = useFile();

  const handleSubmission = async () => {
    await connect();
    console.log("address", address);
    // console.log(typeof address);

    if (address != undefined) {
      let signin = await signInFunction(address);
      console.log(signin.isexist);

      if (signin.isexist == true) {
        await logedinHandler();

        // check for admin in backend
        let isadmin = await isAdminFunction(address);
        console.log(isadmin, "Signin admin");

        if (isadmin == true) 
          await adminHandler();
      }
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
