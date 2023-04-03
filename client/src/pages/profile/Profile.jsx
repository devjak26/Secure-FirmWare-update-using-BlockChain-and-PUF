import React, { useState, useEffect } from 'react'
import './profile.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Profile = ({ user }) => {

  const navigate = useNavigate();
  const [fileCount, setfileCount] = useState(0);

  useEffect(() => {
    countFunction();
  }, [])


  const historyHandler = () => {
    if (fileCount==0) {
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

      <h2 className='profilehead'>Profile Page</h2>
      <div className='profile'>
        <h3>Name: {user?.name}</h3>
        <h3>Email: {user?.email}</h3>
        <h3>Total Firmware downloaded: {fileCount}</h3>
        <button className='quizHistory' onClick={historyHandler}>Download History</button>
      </div>
    </>
  )
}

export default Profile
