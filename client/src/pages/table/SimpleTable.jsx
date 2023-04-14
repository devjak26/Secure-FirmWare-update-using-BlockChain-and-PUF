import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFile } from "../../context/index";
import "./SimpleTable.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useNavigate } from "react-router-dom";

const Table = ({ user,PUFhandler ,IPFSHandler}) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [dataRecevied, setDataRecieved] = useState(false);
  const [url, setUrl] = useState(null);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#fffff");
  const [displayExpand, setdisplayExpand] = useState("none");
  const [expand, setExpand] = useState(-1);

  const ExpandHandler = (index) => {
    if (index == expand) setExpand(-1);
    else setExpand(index);
  };

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

    if (fileData != undefined && fileData.length > 0) setLoading(false);
  }, [fileData]);

  // const downloadFun = (URL) => {
  //   console.log("test: ", URL);
  //   window.location.replace(URL);
  // };

  useEffect(() => {
    if (dataRecevied) {
      setDataRecieved(false);
      downloadFun(url);
      setUrl(null);
    }
  }, [dataRecevied]);

  const handleDownload = async (IpfsHash,Puf) => {
    // Here you can add your download logic, for example:
    // console.log(user[3],IpfsHash);
    // console.log(PUF);
    PUFhandler(Puf);
    IPFSHandler(IpfsHash);
    navigate("/validate");
  };

  const [searchtext, setSearch] = useState("");

  const changeSearch = (event) => {
    setSearch(event.target.value);
    console.log(searchtext);
  };

  return (
    <>
      {loading ? (
        <PacmanLoader color="#36d7b7" className="loader" size="50px" />
      ) : (
        <div className="quizRecord">
          <div className="head">Welcome to our file download page!</div>
          <div className="para">
            Here, you can securely download the firmware files you need for your
            devices. We understand the importance of having the latest and most
            secure versions of firmware files, which is why we have made it easy
            for you to access them.
          </div>
          <div className="downloadSearch">
            <input
              type="text"
              placeholder="Search..."
              onChange={changeSearch}
              className="downloadSearchInput"
            />
          </div>

          {fileData.map((software, index) => {
            console.log(software);
            if (software[1].includes(searchtext)) {
              return (
                <div>
                  <div className="data">
                    <div className="main">
                      <div className="f1">{software[1]}</div>

                      <div className="f2" onClick={() => ExpandHandler(index)}>
                        {expand != index ? "show more" : "show less"}
                      </div>
                    </div>

                    <ul
                      className={expand == index ? "app-expand" : "f3"}
                      key={index}
                      onClick={() => setSelected(index)}
                    >
                      <li>File Type: {software[2]}</li>
                      <li>File Size: {Math.round(parseInt(software[3])/1024)} Kb</li>
                      <li>Date Added: {software[4]}</li>
                      <li>Time Stamp: {software[5]}</li>
                      <li>Total Downloads: {parseInt(software[6])}</li>
                      <li>
                        <button
                          className={`btn ${
                            selected === index
                              ? "btn-secondary"
                              : "btn-secondary"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(software[0],software[7]);
                          }}
                        >
                          {selected === index ? "Download" : "Download"}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default Table;
