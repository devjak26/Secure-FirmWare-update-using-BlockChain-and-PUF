import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
const { contract } = useContract("0x6F3D978A845bA9E9A0972ECd1Df17a841F6106F5");
  const { mutateAsync: add, isLoading } = useContractWrite(contract, "add")

  const address = useAddress();
  const connect = useMetamask();

  const call = async (ipfsHash, fileHash, fileName, fileType, date,fileSize) => {
    try {
      const data = await add([ ipfsHash, fileHash, fileName, fileType, date, fileSize ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        call
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);