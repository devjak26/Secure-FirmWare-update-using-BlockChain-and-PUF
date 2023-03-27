pragma solidity ^0.8.9;

import "./Ownable.sol";

contract Main is Ownable {
    struct DocInfo {
        string ipfsHash;
        string fileName;
        string fileType;
        uint fileSize;
        string dateAdded;
        bool exist;
    }

    mapping(string => DocInfo) collection;
    // fileHash -> file MetaDta

    // event HashAdded(string ipfsHash, string fileHash, uint dateAdded);

    constructor() {
        owner = msg.sender;
    }

    function add(
        string memory _ipfsHash,
        string memory _fileHash,
        string memory _fileName,
        string memory _fileType,
        string memory _dateAdded,
        uint _fileSize
    ) 
    public onlyOwner {
        require(
            collection[_fileHash].exist == false,
            "[E1] This hash already exists in contract."
        );
        DocInfo memory docInfo = DocInfo(
            _ipfsHash,
            _fileName,
            _fileType,
            _fileSize,
            _dateAdded,
            true
        );
        collection[_fileHash] = docInfo;

        // emit HashAdded(_ipfsHash, _fileHash, _dateAdded);
    }

    function get(
        string memory _fileHash
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint,
            bool
        )
    {
        return (
            _fileHash,
            collection[_fileHash].ipfsHash,
            collection[_fileHash].fileName,
            collection[_fileHash].fileType,
            collection[_fileHash].dateAdded,
            collection[_fileHash].fileSize,
            collection[_fileHash].exist
        );
    }
}
