import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useFile } from "../context/index";
import './SimpleTable.css';


const Table = () => {
  const [selected, setSelected] = useState(null);
  const { call1, totalData } = useFile();

  useEffect(()=>{
    console.log("data in Table file...",totalData);

    // totalData.map((software,index)=>(
    //   // console.log(index,software)
    //   console.log(software[0])
    //   ))

  },[totalData])

  const handleDownload = (IpfsHash) => {
    // Here you can add your download logic, for example:
    const baseURL = `https://gateway.pinata.cloud/ipfs/`;
    const URL=`${baseURL}${IpfsHash}`;

    window.open(URL);
  };

  return (
    <>

{/* <div className='heading'>Files Available</div> */}

<div className='quizRecord'>
    <table className="table">
      {/* <thead> */}
        <tr>
          <th>Name</th>
          <th>File Type</th>
          <th>File Size</th>
          {/* <th>Date Added</th> */}
          <th>Download</th>
        </tr>
      {/* </thead> */}
      {/* <tbody> */}
        {totalData.map((software, index) => (
          <tr key={index} onClick={() => setSelected(index)}>
            <td>{software[1]}</td>
            <td>{software[2]}</td>
            {/* <td>{software[3]}</td> */}
            <td>{software[4]}</td>
            <td>
              <button
                className={`btn ${selected === index ? 'btn-secondary' : 'btn-secondary'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(software[0]);
                }}
              >
                {selected === index ? 'Download' : 'Download'}
              </button>
            </td>
          </tr>
        ))}
      {/* </tbody> */}

      <tbody>
        
      </tbody>
    </table>
		</div>
    </>
  );
};

export default Table;
