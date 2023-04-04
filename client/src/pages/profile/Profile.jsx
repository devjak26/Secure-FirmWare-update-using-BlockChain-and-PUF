import React, { useState, useEffect } from 'react'
import './profile.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profileimg from './profileimg.png'

import axios from 'axios'
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
  MDBListGroupItem
} from 'mdb-react-ui-kit';

const Profile = ({ user }) => {

  const navigate = useNavigate();
  const [fileCount, setfileCount] = useState(0);

  useEffect(() => {
    countFunction();
  }, [])


  const historyHandler = () => {
    if (fileCount == 0) {
      toast("You are not attmpted any Quiz yet...")
    }

    else {
      navigate('/quizRecord')
    }
  }

  const countFunction = async () => {
    const res = await axios.get(`http://localhost:9002/getfileCount/${user.userName}`);
    setfileCount(res.data.fileCount);
  }


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
      {/* Same as */}
      <ToastContainer />
      {/* <ToastContainer toastStyle={{ backgroundColor: "black" }} /> */}

      {/* <h2 className='profilehead'>Profile Page</h2> */}
      {/* <div className='profile'>
        <h3>Name: {user?.name}</h3>
        <h3>Email: {user?.email}</h3>
        <h3>Total Firmware downloaded: {fileCount}</h3>
        <button className='quizHistory' onClick={historyHandler}>Download History</button>
      </div> */}

      <section className="section" >

        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem className="user" active>User Profile</MDBBreadcrumbItem>
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
                    fluid />
                  <p className="text-muted mb-1">Full Stack Developer</p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn outline className="ms-1">History</MDBBtn>
                    <MDBBtn outline className="ms-1">UploadFile</MDBBtn>


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
                      <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">example@example.com</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />


                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Metamask Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>


            </MDBCol>

            <MDBRow>

              <MDBCol >

                <input className='form-control' type='text' placeholder='Input New Admin Address' />
              </MDBCol>

              <MDBCol>
                <MDBBtn outline className="ms-1">AddAdmin</MDBBtn>
              </MDBCol>
            </MDBRow>


          </MDBRow>



        </MDBContainer>


      </section>

    </>


  )
}

export default Profile
