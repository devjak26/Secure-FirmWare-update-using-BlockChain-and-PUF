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
  const [fileData, setfileData] = useState([]);
  const [ PUF, setPUF ] = useState("");

  const { contract } = useContract(
    "0xE706Af419E51344bA9F261dF9912A027fa1E47AF"
  );

  useEffect(() => {
    if (contract) {
      getFilesFunction();
    }
  }, [contract]);

  const PUFgetter = (PUFKEY) => {
    setPUF(PUFKEY);
    console.log(PUF);
  };

  const { mutateAsync: addFile, isLoading } = useContractWrite(
    contract,
    "addFile"
  );

  const { mutateAsync: newDownloadByUser, isLoading2 } = useContractWrite(
    contract,
    "newDownloadByUser"
  );

  const { mutateAsync: adminAdd, isLoading4 } = useContractWrite(
    contract,
    "adminAdd"
  );

  const address = useAddress();
  const connect = useMetamask();

  // console.log("address", address);

  const addFileFunction = async (
    address,
    ipfsHash,
    fileName,
    fileType,
    date,
    time,
    fileSize,
    PUF
  ) => {
    try {
      console.log(ipfsHash, fileName, fileType, date, time, fileSize, PUF);
      await connect();
      // await address();
      console.log("address...", address);
      const data = await addFile([
        address,
        ipfsHash,
        fileName,
        fileType,
        date,
        time,
        fileSize,
        PUF,
      ]);

      console.info("contract call successs", data);
      return data;
    } catch (err) {
      console.error("contract call failure", err);
      return err;
    }
  };

  const getFilesFunction = async () => {
    const filedata = await contract.call("getFiles");
    // console.log(filedata);
    setfileData([...filedata]);
  };

  const isAdminFunction = async (address) => {
    const isadmin = await contract.call("isAdmin", address);
    console.log("admin:", isadmin);
    return isadmin;
  };

  const signInFunction = async (address) => {
    await connect();
    const signin = await contract.call("signIn", address);
    console.log("signin:", signin);
    return signin;
  };

  const signUpFunction = async (address, name, userName, email) => {
    try {
      await connect();
      // await address();
      const data = await contract.call(
        "signUp",
        address,
        name,
        userName,
        email
      );
      // signUp([address, name, userName, email]);

      console.info("contract call successs..", data);
      return data;
    } catch (err) {
      console.error("contract call failure", err);
      return err;
    }
  };

  const filesUploadedbyAdmin = async (address) => {
    const files = await contract.call("uploadedbyAdmin", address);
    console.log(files);
    return files;
  };

  const filesdownloadedbyUser = async (address) => {
    const files = await contract.call("downloadedbyUser", address);
    console.log(files);

    return files;
  };

  const newDownloadByUserFunction = async (address, ipfs) => {
    try {
      await connect();
      // await address();
      const data = await newDownloadByUser([address, ipfs]);
      console.info("contract call successs", data);
      return data;
    } catch (err) {
      console.error("contract call failure", err);
      return err;
    }
  };

  const adminAddFunction = async (prev, newAdmin) => {
    try {
      await connect();
      // await address();
      const data = await adminAdd([prev, newAdmin]);
      console.info("contract call successs", data);
      return data;
    } catch (err) {
      console.error("contract call failure", err);
      return err;
    }
  };

  return (
    <FileContext.Provider
      value={{
        address,
        contract,
        connect,
        fileData,
        addFileFunction,
        isAdminFunction,
        signInFunction,
        signUpFunction,
        newDownloadByUserFunction,
        adminAddFunction,
        filesUploadedbyAdmin,
        filesdownloadedbyUser,
        PUF,
        PUFgetter,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

const useFile = () => {
  return useContext(FileContext);
};

export { FileProvider, useFile };
