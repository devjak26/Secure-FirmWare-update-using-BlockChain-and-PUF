import React, { useState ,useEffect} from "react";
import crypto from "crypto-browserify";
// const crypto =require("crypto-browserify")
import sjcl from 'sjcl';
import "./Challenges.css";
import { useFile } from "../../context/index";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Alert } from "bootstrap";

const Challenges = ({ challenges, PUF, ipfs, user }) => {

  const sha256=(message)=>{
    const myString = message;
    const myBitArray = sjcl.hash.sha256.hash(myString)
    const myHash = sjcl.codec.hex.fromBits(myBitArray)
    // console.log(myHash);
    return myHash;
  }

  const [response1, setresponse1] = useState("");
  const [response2, setresponse2] = useState("");
  const [response3, setresponse3] = useState("");
  const [Url,setUrl]=useState();

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

  const pufKey = PUF;

  const op1=sha256(challenges[0] + pufKey);
  const op2=sha256(challenges[1] + pufKey);
  const op3=sha256(challenges[2] + pufKey);

  useEffect(()=>{
    console.log(PUF);
    console.log("1:",op1);
    console.log("2:",op2);
    console.log("3:",op3);
  },[])

const download=async()=>{
  const baseURL = `https://gateway.pinata.cloud/ipfs/`;
    const URL = `${baseURL}${ipfs}`;
    setUrl(URL);
    // downloadFun(URL);
    console.log("before");
    const data = await newDownloadByUserFunction(user[3], ipfs);
    // console.log(data.receipt);

    if (data.receipt) {
      console.log("test: ", URL);
      window.location.replace(URL);
    }
}
  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log(pufKey);

    if (
      op1 == response1 &&
      op2 == response2 &&
      op3 == response3
    ) {
      console.log("Correct");
      download();
    } else {
      // console.log("Please try again..");
      alert("Please try again..");
    }
  };

  const func1 = (event) => {
    setresponse1(event.target.value);
  };

  const func2 = (event) => {
    setresponse2(event.target.value);
  };

  const func3 = (event) => {
    setresponse3(event.target.value);
  };

  return (
    <MDBContainer>
      <MDBCard
        className="bg-white my-5 mx-auto"
        style={{ borderRadius: "1rem", maxWidth: "1000px" }}
      >
        <MDBCardBody className="p-5 w-100 d-flex flex-column">
          <h2 className="fw-bold mb-2 text-center">PUF Authentication</h2>

          <MDBRow className="mb-3">
            <MDBCol className="challengeBox">
              <h4 className="mb-2 text-center">{challenges[0]}</h4>
            </MDBCol>
            <MDBCol>
              <MDBInput
                wrapperClass="mb-4 w-100"
                placeholder="Enter Your response"
                id="formControlLg"
                type="password"
                size="lg"
                onChange={func1}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-3">
            <MDBCol className="challengeBox">
              <h4 className="mb-2 text-center">{challenges[1]}</h4>
            </MDBCol>
            <MDBCol>
              <MDBInput
                wrapperClass="mb-4 w-100"
                placeholder="Enter Your response"
                id="formControlLg"
                type="password"
                size="lg"
                onChange={func2}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-3">
            <MDBCol className="challengeBox">
              <h4 className="mb-2 text-center">{challenges[2]}</h4>
            </MDBCol>
            <MDBCol>
              <MDBInput
                wrapperClass="mb-4 w-100"
                placeholder="Enter Your response"
                id="formControlLg"
                type="password"
                size="lg"
                onChange={func3}
              />
            </MDBCol>
          </MDBRow>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Validate
          </button>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Challenges;
