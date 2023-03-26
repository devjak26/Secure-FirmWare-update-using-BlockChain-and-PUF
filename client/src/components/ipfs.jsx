// using infura.io node, otherwise ipfs requires local
// daemon on your computer/server.

import IPFS from 'ipfs-http-client';

// const IPFS = require('ipfs-http-client');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/ipfs/api/v0' });
// 
// run with local daemon
// const ipfsApi = require(‘ipfs-api’);
// const ipfs = new ipfsApi(‘localhost’, ‘5001’, {protocol:‘http’});

export default ipfs;