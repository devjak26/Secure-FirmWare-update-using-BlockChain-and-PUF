import React, { useState } from "react";
import crypto from "crypto-browserify";
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

const Challenges = ({ challenges, PUF }) => {
  console.log(PUF);

  const sha256 = (message) => {
    console.log(message);
    const hash = crypto.createHash("sha256");
    // hash.update(message);
    console.log(hash);
    return "HH";
  };

  const [response1, setresponse1] = useState("");
  const [response2, setresponse2] = useState("");
  const [response3, setresponse3] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const pufKey = PUF;
    console.log(pufKey);
    if (
      sha256(challenges[0] + pufKey) == response1 &&
      sha256(challenges[1] + pufKey) == response2 &&
      sha256(challenges[2] + pufKey) == response3
    ) {
      console.log("Correct");
    } else {
      console.log("Please try again..");
    }
    // if(isVerified){
    //   console.log("Correct");
    // }
    // else{
    //   console.log("Incorrect");
    // }
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
