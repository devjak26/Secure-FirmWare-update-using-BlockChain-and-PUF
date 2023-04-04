import React, { useContext, createContext, useEffect, useState } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

const FileContext = createContext();

const FileProvider = ({ children }) => {

  const [fileData,setfileData]=useState([]);
  const [signIncheck,setSignInCheck]=useState(false);
  const [signUpcheck,setSignUpCheck]=useState(false);
  const [adminCheck,setAdminCheck]=useState(false);

  const { contract } = useContract(
    "0x981DdF7cD8881D748cE38dC8613147D3673cDe39"
  );

    useEffect(()=>{
    if(contract)
      getFun();
  },[contract])

  const { mutateAsync: addFile, isLoading } = useContractWrite(contract, "addFile");

  const { mutateAsync: signUp, isLoading1 } = useContractWrite(contract, "signUp")

  const { mutateAsync: newDownloadByUser, isLoading2 } = useContractWrite(contract, "newDownloadByUser")

  const { mutateAsync: adminAdd, isLoading4 } = useContractWrite(contract, "adminAdd")

  const address = useAddress();
  console.log("address",address);

  const connect = useMetamask();

  const addFileFunction = async (address,ipfsHash, fileName, fileType, date, fileSize) => {
    try {
      console.log("tes",ipfsHash, fileName, fileType, date,time, fileSize);
      connect();
      console.log("address...",address);
      const data = await addFile([address,ipfsHash, fileName, fileType, date,time, fileSize]);

      console.info("contract call successs", data);
      // getFun();
    } catch (err) {
      console.error("contract call failure", err);
    }
  };


  const getFilesFunction = async() => {
    const filedata=await contract.call("getFiles");
    console.log(filedata);
    setTotalData([...filedata]);
};

const isAdminFunction=async(address)=>{
  const isadmin=await contract.call("isAdmin",address);
  console.log("admin:",isadmin);
}

const signInFunction=async(address)=>{
  const signin=await contract.call("isAdmin",address);
  console.log("signin:",signin);
}

const signUpFunction = async (address, name, userName, email) => {
  try {
    const data = await signUp([ address, name, userName, email ]);
    console.info("contract call successs", data);
  } catch (err) {
    console.error("contract call failure", err);
  }
}

const newDownloadByUserFunction = async (address, ipfs ) => {
  try {
    const data = await newDownloadByUser([ address, ipfs ]);
    console.info("contract call successs", data);
  } catch (err) {
    console.error("contract call failure", err);
  }
}

const adminAddFunction = async (prev,newAdmin) => {
  try {
    const data = await adminAdd([ prev, newAdmin ]);
    console.info("contract call successs", data);
  } catch (err) {
    console.error("contract call failure", err);
  }
}

  return (
    <FileContext.Provider
      value={{
        address,
        contract,
        connect,
        call1,
        totalData
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

const useFile = ()=>{
  return useContext(FileContext);
}


export {FileProvider, useFile};
