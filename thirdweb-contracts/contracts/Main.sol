pragma solidity ^0.8.9;

import "./Ownable.sol";

contract Main is Ownable {
    struct DocInfo {
        string ipfsHash;
        string fileName;
        string fileType;
        uint fileSize;
        string dateAdded;
    }

    // mapping(string => DocInfo) collection;

    DocInfo[] private metadata; 

    constructor() {
        owner = msg.sender;
    }

    function add(
        string memory _ipfsHash,
        string memory _fileName,
        string memory _fileType,
        string memory _dateAdded,
        uint _fileSize
    ) 
    public onlyOwner {
        DocInfo memory docInfo = DocInfo(
            _ipfsHash,
            _fileName,
            _fileType,
            _fileSize,
            _dateAdded
        );

        metadata.push(docInfo);
    }

    function get() public view returns ( DocInfo[] memory)
    {
        return metadata;
    }
}
