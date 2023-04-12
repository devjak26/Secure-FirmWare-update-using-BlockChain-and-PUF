import react, { useState, useEffect, useContext } from "react";
import "./fileUpload.css";
import img from "./img.webp";
import axios from "axios";
import { useFile } from "../../context/index";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PacmanLoader from "react-spinners/PacmanLoader";

const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0NjhkMTgxMS1lOGI1LTQzZDUtYTg4OS0xYjliZWI1NjgzNTkiLCJlbWFpbCI6ImlpdDIwMjAxMDNAaWlpdGEuYWMuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOWFhMDdkOTBmNTc0NWRiOTQ2ODEiLCJzY29wZWRLZXlTZWNyZXQiOiI2ZDQxOWQ2MzBiZDkwODBhNWFhNGJmZDAyOGViNDM2MWIzNDEwNmRiYzJlMDU0YTZjZDVhM2NjMDRiNDg3MDllIiwiaWF0IjoxNjc5ODUxODMzfQ.-f10NGa3eB6SzzuXXxU-w4p450Bhourg9xJEJURqpgo`;

const FileUpload = ({ isAdmin }) => {
  const [file, setFile] = useState(null);
  const [displayImg, setDisplayImg] = useState("none");

  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [URL, setURL] = useState("");
  const [filesData, setFilesData] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isUloaded, setIsUploaded] = useState(false);
  const [PUF, setPUF] = useState("");

  useEffect(() => {
    if (ipfsHash != "") {
      callHandler();
    }
  }, [ipfsHash]);

  const {
    fileData,
    addFileFunction,
    isAdminFunction,
    signInFunction,
    signUpFunction,
    newDownloadByUserFunction,
    adminAddFunction,
  } = useFile();

  const PUFHandler = (e) => {
    setPUF(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmission = async () => {
    setFileName(file.name);

    setFileSize(file.size);

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    setDate(currentDate);

    let currentTime = new Date().toLocaleTimeString();

    setTime(currentTime);

    let temp = file.name.split(".");
    temp = temp[temp.length - 1];
    setFileType(temp);

    console.log(temp, currentDate);

    const formData = new FormData();
    console.log();
    formData.append("file", file);

    const metadata = JSON.stringify({
      name: "File name",
    });

    console.log("metadata");

    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
        }
      );
      console.log(res.data.IpfsHash);
      setIpfsHash(res.data.IpfsHash);
    } catch (error) {
      console.log(error);
    }

    setIsUploaded(false);
  };

  const changeImage = (e) => {
    setFile(e.target.files[0]);
    setDisplayImg("block");
    setIsUploaded(true);
    toast("Please Insert PUF Key..");
  };

  const callHandler = async () => {
    let data = await addFileFunction(
      "0x39ee928476d24c200528118579d6d16ca011DA08",
      ipfsHash,
      fileName,
      fileType,
      date,
      time,
      fileSize,
      PUF
    );

    console.log(data);
    setLoading(false);
    // setUploaded(true);

    if (data.receipt) toast("file Uploaded successfully");
    else toast("Please try again....");

    setIpfsHash("");
    setDisplayImg("none");
  };

  const notAdmin = () => {
    navigate("/");
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

      {!isAdmin && notAdmin()}

      {loading ? (
        <PacmanLoader color="#36d7b7" className="loader" size="50px" />
      ) : (
        <div className="fileUpload">
          <div className="total">
            <div className="aboutUs">
              Welcome to the file upload page for admin. Here, you can securely
              upload firmware files and provide a unique public key for users to
              access them. Thank you for your contribution to our secure
              firmware file storage.
            </div>

            <div className="right">
              <div className="input">
                <img
                  src={img}
                  alt="loading..."
                  style={{
                    height: "200px",
                    width: "300px",
                    display: displayImg,
                  }}
                  className="img"
                />

                <div
                  className="PUF"
                  style={isUloaded ? { display: "block" } : { display: "none" }}
                >
                  <input
                    className="form-c"
                    type="text"
                    placeholder="Input PUF Key"
                    onChange={PUFHandler}
                  />
                </div>

                <button
                  className="label"
                  onClick={handleSubmission}
                  style={isUloaded ? { display: "block" } : { display: "none" }}
                >
                  Submit
                </button>

                <label className="label">
                  {isUloaded ? "Choose Another File" : "Choose A File"}

                  <input
                    type="file"
                    onChange={changeImage}
                    className="inputItem"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUpload;
