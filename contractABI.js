const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

const contractABI = [
  {
    "inputs":[
      {"internalType":"bytes32","name":"certHash","type":"bytes32"},
      {"internalType":"address","name":"recipient","type":"address"}
    ],
    "name":"issueCertificate",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"bytes32","name":"certHash","type":"bytes32"}],
    "name":"revokeCertificate",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"bytes32","name":"certHash","type":"bytes32"}],
    "name":"verifyCertificate",
    "outputs":[
      {"internalType":"bool","name":"isValid","type":"bool"},
      {"internalType":"address","name":"recipient","type":"address"},
      {"internalType":"uint256","name":"issueDate","type":"uint256"},
      {"internalType":"bool","name":"revoked","type":"bool"}
    ],
    "stateMutability":"view",
    "type":"function"
  }
];

export { contractAddress, contractABI };
