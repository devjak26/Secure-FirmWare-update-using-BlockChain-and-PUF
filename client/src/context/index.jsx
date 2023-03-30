import React, { useContext, createContext, useState, useEffect } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite,useContractRead } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

  // const [totalData,setTotalData]=useState();

  // useEffect(()=>{
  //   const { data, isloading } = useContractRead(contract, "get", 1);
  //   setTotalData(data);
  // },[]);

const { contract } = useContract("0x6F3D978A845bA9E9A0972ECd1Df17a841F6106F5");
  const { mutateAsync: add, isLoading } = useContractWrite(contract, "add")

  const address = useAddress();
  const connect = useMetamask();

  const call = async (ipfsHash, fileHash, fileName, fileType, date,fileSize) => {
    try {
      console.log(fileHash);
      const data = await add([ ipfsHash, fileHash, fileName, fileType, date, fileSize ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  // const { data, isloading } = useContractRead(contract, "get", 1)
  // console.log(data)
  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        call
        // totalData
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);