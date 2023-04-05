import React, { useState, useEffect } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profileimg from "./profileimg.png";
import axios from "axios";
import { useFile } from "../../context/index";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBInput,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const Profile = ({ isAdmin, user, isLogedIn }) => {
  const navigate = useNavigate();
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

  const [fileCount, setfileCount] = useState(0);
  const [newAdmin, setNewAdmin] = useState("");

  const changenewAdmin = (event) => {
    setNewAdmin(event.target.value);
  };

  const submitNewAdmin = () => {
    adminAddFunction(user.address, newAdmin);
  };

  const historyHandler = () => {
    if (fileCount == 0) {
      toast("You are not Downloaded any firmware file yet...");
    } else {
      navigate("/history");
    }
  };

  const countFunction = async () => {
    const res = await axios.get(
      `http://localhost:9002/getfileCount/${user.userName}`
    );
    setfileCount(res.data.fileCount);
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

      <section className="section">
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem className="user" active>
                  User Profile
                </MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={profileimg}
                    alt="avatar"
                    className="rounded-circle"
                    width="55%"
                    // style={{ width: '600px' }}
                    fluid
                  />
                  <p className="text-muted mb-1">Full Stack Developer</p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn outline className="ms-1">
                      History
                    </MDBBtn>
                    <MDBBtn outline className="ms-1">
                      UploadFile
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4 ">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user[0]}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user[2]}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />

                  {/* <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        (098) 765-4321
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow> */}
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Metamask Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user[3]}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBRow>
              <MDBCol>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Input New Admin Address"
                  onChange={changenewAdmin}
                />
              </MDBCol>

              <MDBCol>
                <MDBBtn outline className="ms-1" onClick={submitNewAdmin}>
                  AddAdmin
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
};

export default Profile;
