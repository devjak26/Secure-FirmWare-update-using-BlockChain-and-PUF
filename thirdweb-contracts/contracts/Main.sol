pragma solidity ^0.8.9;

contract Main {
    struct DocInfo {
        string ipfsHash;
        string fileName;
        string fileType;
        uint256 fileSize;
        string dateAdded;
        string timeStamp;
        uint256 downloadCount;
    }

    struct UserInfo {
        string name;
        string username;
        string email;
        bool isexist;
    }

    DocInfo[] private metadata;
    // storing metadata of uploaded files

    mapping(string => UserInfo) userNameToData;
    // user Address to UserInfo

    string[] private adminList;
    //list of all admin addresses

    mapping(string => string[]) downloadedByUser;
    // mapping user address by ipfs code of downloaded files

    mapping(string => string[]) uploadedByAdmin;

    // mapping admin address by ipfs code of uploaded files

    constructor() {
        adminList.push("0x39ee928476d24c200528118579d6d16ca011DA08");
        // first admin only who can add another admins
    }

    function adminAdd(
        string memory prev,
        string memory newAdmin
    ) public returns (uint8) {
        uint8 flag = 0;

        for (uint256 i = 0; i < adminList.length; i++) {
            if (
                keccak256(abi.encodePacked(adminList[i])) ==
                keccak256(abi.encodePacked(prev))
            ) {
                flag = 1;
            }

            if (
                keccak256(abi.encodePacked(adminList[i])) ==
                keccak256(abi.encodePacked(newAdmin))
            ) {
                flag = 2;
                // new admin already in admin list
                break;
            }
        }

        if (flag != 1) return flag;

        adminList.push(newAdmin);
        return flag;
    }

    function signUp(
        string memory _address,
        string memory _name,
        string memory _userName,
        string memory _email
    ) public returns (bool) {
        if (userNameToData[_address].isexist) return false;
        UserInfo memory userInfo = UserInfo(_name, _userName, _email, true);

        userNameToData[_address] = userInfo;
        return true;
    }

    function signIn(string memory _address) public view returns (bool) {
        if (userNameToData[_address].isexist) return true;

        return false;
    }

    function isAdmin(string memory _address) public view returns (bool) {
        bool flag = false;

        for (uint256 i = 0; i < adminList.length; i++) {
            if (
                keccak256(abi.encodePacked(adminList[i])) ==
                keccak256(abi.encodePacked(_address))
            ) {
                flag = true;
                break;
            }
        }

        return flag;
    }

    function addFile(
        string memory _address,
        string memory _ipfsHash,
        string memory _fileName,
        string memory _fileType,
        string memory _dateAdded,
        string memory _timeAdded,
        uint256 _fileSize
    ) public {
        DocInfo memory docInfo = DocInfo(
            _ipfsHash,
            _fileName,
            _fileType,
            _fileSize,
            _dateAdded,
            _timeAdded,
            0
        );

        metadata.push(docInfo);
        newDownloadByUser(_address, _ipfsHash);
    }

    function newDownloadByUser(
        string memory _address,
        string memory _ipfs
    ) public {
        downloadedByUser[_address].push(_ipfs);

        newDownload(_ipfs);
    }

    function newUploadByAdmin(
        string memory _address,
        string memory _ipfs
    ) private {
        uploadedByAdmin[_address].push(_ipfs);
    }

    function newDownload(string memory _ipfsHash) private {
        for (uint16 i = 0; i < metadata.length; i++) {
            if (
                keccak256(abi.encodePacked(metadata[i].ipfsHash)) ==
                keccak256(abi.encodePacked(_ipfsHash))
            ) {
                metadata[i].downloadCount += 1;
            }
        }
    }

    function getFiles() public view returns (DocInfo[] memory) {
        return metadata;
    }
}
