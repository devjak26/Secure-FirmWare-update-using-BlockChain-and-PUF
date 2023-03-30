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

  const [totalData,setTotalData]=useState([]);

  const { contract } = useContract(
    "0x9f75fce6a61Bc2bd052c02be60BA8C4e76944f64"
  );

    useEffect(()=>{
    if(contract)
      getFun();
  },[contract])

  // console.log(contract);
  const { mutateAsync: add, isLoading } = useContractWrite(contract, "add");

  const address = useAddress();
  const connect = useMetamask();


  const call1 = async (ipfsHash, fileName, fileType, date, fileSize) => {
    try {
      console.log("tes",ipfsHash, fileName, fileType, date, fileSize);
      connect();
      const data = await add([ipfsHash, fileName, fileType, date, fileSize]);
      console.info("contract call successs", data);
      // getFun();
    } catch (err) {
      console.error("contract call failure", err);
    }
  };


  const getFun = async() => {
    const data1=await contract.call("get");
    console.log(data1);
    setTotalData([...data1]);
};

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
