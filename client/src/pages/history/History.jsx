import React, { useEffect, useState } from "react";
import "./history.css";
import { useFile } from "../../context/index";
import { useAddress, useMetamask } from "@thirdweb-dev/react";

const History = ({ isAdmin, user }) => {
  const address = useAddress();
  const connect = useMetamask();

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

  const [downloadedfiles, setDownloadedfiles] = useState([]);
  const [isgetfiles, setIsgetfiles] = useState(false);
  const [downloadedinfo, setDownloadedInfo] = useState([]);

  useEffect(() => {
    downloadedgetHandler();
  }, []);

  useEffect(() => {
    if (isgetfiles) {
      getInfo();
    }
  }, [isgetfiles]);

  const getInfo = () => {
    console.log(downloadedfiles);
    console.log(fileData);
    const compleInfo = [];

    for (let i = 0; i < downloadedfiles.length; i++) {
      const element = downloadedfiles[i];

      for (let j = 0; j < fileData.length; j++) {
        if (element == fileData[j][0]) {
          compleInfo.push(fileData[j]);
        }
      }
    }

    // console.log("op.....",compleInfo);
    setDownloadedInfo(compleInfo);
  };

  const downloadedgetHandler = async () => {
    console.log(user);
    if (user[3] != undefined) {
      const data = await filesdownloadedbyUser(user[3]);
      setDownloadedfiles(data);
      setIsgetfiles(true);
    }
  };

  const [searchtext, setSearch] = useState("");

  const changeSearch = (event) => {
    setSearch(event.target.value);
    console.log(searchtext);
  };

  return (
    <>
      <div className="quizRecord">
        <div className="heading">downloaded Firmwares by You</div>

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
          </tr>

          {downloadedinfo.map((software, index) => {
            if (software[1].includes(searchtext)) {
              return (
                <tr key={index} onClick={() => setSelected(index)}>
                  <td>{software[1]}</td>
                  <td>{software[2]}</td>
                </tr>
              );
            }
          })}
        </table>
      </div>
    </>
  );
};

export default History;
