import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFile } from "../../context/index";
import "./SimpleTable.css";

const Table = ({ user }) => {
  const [selected, setSelected] = useState(null);
  const [dataRecevied, setDataRecieved] = useState(false);
  const [url, setUrl] = useState(null);
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

  useEffect(() => {
    console.log("data in Table file...", fileData);
  }, [fileData]);
  
  const downloadFun = (URL) => {
    console.log("test: ", URL)
    window.location.replace(URL);
  };
  useEffect(()=>{
    if(dataRecevied){
      setDataRecieved(false);
      downloadFun(url);
      setUrl(null)
    }
  }, [dataRecevied])
  const handleDownload = async (IpfsHash) => {
    // Here you can add your download logic, for example:
    // console.log(user[3],IpfsHash);
    const baseURL = `https://gateway.pinata.cloud/ipfs/`;
    const URL = `${baseURL}${IpfsHash}`;
    setUrl(URL);
    // downloadFun(URL);
    console.log("before");
    const data = await newDownloadByUserFunction(user[3], IpfsHash);
    console.log(data.receipt);

    if (data.receipt) {
      setDataRecieved(true);
      console.log("after", URL);
      
    }
  };

  // const [query , setQuery] = useState("");
  // console.log(query)

  const [searchtext, setSearch] = useState("");

  const changeSearch = (event) => {
    setSearch(event.target.value);
    console.log(searchtext);
  };

  return (
    <>
      <div className="quizRecord">
        <div className="heading">Available Firmwares to download</div>

        <div className="SearchPanel">
          <input
            type="text"
            placeholder="Search..."
            onChange={changeSearch}
            className="SearchInput"
          />
        </div>

        <table className="table">
          <tr>
            <th>Name</th>
            <th>File Type</th>
            {/* <th>File Size</th> */}
            <th>Date Added</th>
            <th>Download</th>
          </tr>

          {fileData.map((software, index) => {
            if (software[1].includes(searchtext)) {
              return (
                <tr key={index} onClick={() => setSelected(index)}>
                  <td>{software[1]}</td>
                  <td>{software[2]}</td>
                  {/* <td>{software[3]}</td> */}
                  <td>{software[4]}</td>
                  <td>
                    <button
                      className={`btn ${
                        selected === index ? "btn-secondary" : "btn-secondary"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(software[0]);
                      }}
                    >
                      {selected === index ? "Download" : "Download"}
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </table>
      </div>
    </>
  );
};

export default Table;
