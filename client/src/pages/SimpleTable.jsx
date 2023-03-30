import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const softwareData = [
  {
    name: 'Software A',
    fileType: 'exe',
    fileSize: '20 MB',
    dateAdded: '01/01/2023',
    downloadUrl: 'https://download-url.com/software-a'
  },
  {
    name: 'Software B',
    fileType: 'zip',
    fileSize: '30 MB',
    dateAdded: '01/02/2023',
    downloadUrl: 'https://download-url.com/software-b'
  },
  {
    name: 'Software C',
    fileType: 'dmg',
    fileSize: '40 MB',
    dateAdded: '01/03/2023',
    downloadUrl: 'https://download-url.com/software-c'
  },
  {
    name: 'Software D',
    fileType: 'msi',
    fileSize: '50 MB',
    dateAdded: '01/04/2023',
    downloadUrl: 'https://download-url.com/software-d'
  },
];

const Table = () => {
  const [selected, setSelected] = useState(null);

  const handleDownload = (downloadUrl) => {
    // Here you can add your download logic, for example:
    window.open(downloadUrl);
  };

  return (
		<div className="table-responsive">
    <table className="table mx-auto w-auto">
      <thead>
        <tr>
          <th>Name</th>
          <th>File Type</th>
          <th>File Size</th>
          <th>Date Added</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody>
        {softwareData.map((software, index) => (
          <tr key={index} onClick={() => setSelected(index)}>
            <td>{software.name}</td>
            <td>{software.fileType}</td>
            <td>{software.fileSize}</td>
            <td>{software.dateAdded}</td>
            <td>
              <button
                className={`btn ${selected === index ? 'btn-primary' : 'btn-secondary'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(software.downloadUrl);
                }}
              >
                {selected === index ? 'Download' : 'Download'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
		</div>
  );
};

export default Table;
