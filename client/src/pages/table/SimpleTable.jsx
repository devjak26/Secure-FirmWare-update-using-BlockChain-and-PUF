import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFile } from "../../context/index";
import "./SimpleTable.css";


const Table = () => {
  const [selected, setSelected] = useState(null);
  const { call1, totalData } = useFile();

  useEffect(() => {
    console.log("data in Table file...", totalData);
  }, [totalData]);

  const handleDownload = (IpfsHash) => {
    // Here you can add your download logic, for example:
    const baseURL = `https://gateway.pinata.cloud/ipfs/`;
    const URL = `${baseURL}${IpfsHash}`;

    window.open(URL);
  };

  // const [query , setQuery] = useState("");
  // console.log(query)

  const [searchtext , setSearch] = useState("");

  const changeSearch = (event) => {
    setSearch(event.target.value);
    console.log(searchtext);
  }

  return (
    <>
      <div className="quizRecord">
      <div className='heading'>Available Firmwares to download</div>
        
      <div className="SearchPanel">
        <input
          type="text"
          placeholder="Search..."
          onChange={changeSearch}
          className="SearchInput"
        />
      </div>
        
        <table className="table" >
        
          <tr>
            <th>Name</th>
            <th>File Type</th>
            {/* <th>File Size</th> */}
            <th>Date Added</th>
            <th>Download</th>
          </tr>

          {totalData.map((software, index) => {
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
