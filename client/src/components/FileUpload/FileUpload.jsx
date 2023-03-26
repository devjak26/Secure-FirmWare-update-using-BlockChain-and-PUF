import react, { useState, useEffect } from "react";
import "./fileUpload.css";
import img from "./img.webp";
import ipfs from "../ipfs";
// import * as IPFS from 'ipfs-core';

// import * as process from "process";
// window.process = process;

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [displayImg, setDisplayImg] = useState("none");

  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileHash, setFileHash] = useState(0);
  const [date, setDate] = useState("");
  const [buffer, setBuffer] = useState([]);

  useEffect(() => {
    if (file) {
      // console.log(file.name);
      setFileName(file.name);
      setFileHash(fileHash + 1);

      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${day}-${month}-${year}`;
      setDate(currentDate);

      let temp = file.name.split(".");
      temp = temp[temp.length - 1];
      setFileType(temp);

      console.log(temp, currentDate, fileHash);

      const fileReader = async () => {
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => convertToBuffer(reader);

        // console.log(convertToBuffer(file));
      };

      fileReader().catch(console.error);
    }
  }, [fileName, file]);

  useEffect(() => {
    console.log("Buffer", buffer);

    if (buffer.length > 0) {
      ipfs.add(buffer, (err, Hash) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log(Hash[0].hash);
          return Hash[0].hash;
        }
      });
    }
  }, [buffer]);


  const convertToBuffer = async (reader) => {
    // file converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);

    setBuffer(buffer);
    // return buffer;
  };

  const changeImage = (e) => {
    setFile(e.target.files[0]);
    setDisplayImg("block");
  };

  return (
    <>
      <h2 className="imgcheck">File Uploader</h2>
      <div className="input">
        <img
          src={img}
          alt="loading..."
          style={{ height: "200px", width: "300px", display: displayImg }}
          className="img"
        />

        <label className="label">
          Choose A File
          <input type="file" onChange={changeImage} className="inputItem" />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
