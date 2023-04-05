import React, { useState, useEffect } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profileimg from "./profileimg.png";
import axios from "axios";
import { useFile } from "../../context/index";

const Profile = ({ isAdmin, user, isLogedIn }) => {
  const navigate = useNavigate();
  console.log(user[0]);
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

  const [newAdmin, setNewAdmin] = useState("");

  const changenewAdmin = (event) => {
    setNewAdmin(event.target.value);
  };

  const submitNewAdmin = async() => {
    await adminAddFunction(user[3], newAdmin);
  };

  const historyHandler = async () => {
    const data = await filesdownloadedbyUser(user[3]);
    console.log(data);

    if (data.length == 0) {
      toast("You are not Downloaded any firmware file yet...");
    } else {
      navigate("/history");
    }
  };

  const uploadHandler = () => {
    navigate("/fileUpload");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ToastContainer />

      <div className="section">
        <div className="profilehead">{user[1]} profile</div>
        <div className="container">
          <div className="left">
            <img
              src={profileimg}
              alt="avatar"
              className="rounded-circle"
              width="85%"
            ></img>
          </div>

          <div className="right">
            <div className="username">Name : {user[0]}</div>
            <div className="useremail">Email : {user[2]}</div>
            <div className="address">MetaMask Address : {user[3]}</div>

            <div className="btns">
              <button className="btn" onClick={historyHandler}>History</button>

              {isAdmin && (
                <button className="btn" onClick={uploadHandler}>
                  UploadFile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bottom">
          <input
            className="form-control"
            type="text"
            placeholder="Input New Admin Address"
            onChange={changenewAdmin}
          />

          <button className="btn" onClick={submitNewAdmin}>
            Admin Add
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
