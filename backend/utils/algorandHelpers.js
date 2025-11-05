const algosdk = require('algosdk');

/**
 * Format microAlgos to ALGO
 */
const microAlgosToAlgos = (microAlgos) => {
  return Number(microAlgos) / 1000000;
};

/**
 * Format ALGO to microAlgos
 */
const algosToMicroAlgos = (algos) => {
  return Math.floor(Number(algos) * 1000000);
};

/**
 * Validate Algorand address
 */
const isValidAddress = (address) => {
  try {
    return algosdk.isValidAddress(address);
  } catch (error) {
    return false;
  }
};

/**
 * Format address for display (truncate middle)
 */
const formatAddress = (address, startChars = 6, endChars = 4) => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Get AlgoExplorer URL for transaction
 */
const getExplorerTxUrl = (txId, network = 'testnet') => {
  const baseUrl = network === 'mainnet' 
    ? 'https://algoexplorer.io' 
    : 'https://testnet.algoexplorer.io';
  return `${baseUrl}/tx/${txId}`;
};

/**
 * Get AlgoExplorer URL for address
 */
const getExplorerAddressUrl = (address, network = 'testnet') => {
  const baseUrl = network === 'mainnet' 
    ? 'https://algoexplorer.io' 
    : 'https://testnet.algoexplorer.io';
  return `${baseUrl}/address/${address}`;
};

/**
 * Get AlgoExplorer URL for asset
 */
const getExplorerAssetUrl = (assetId, network = 'testnet') => {
  const baseUrl = network === 'mainnet' 
    ? 'https://algoexplorer.io' 
    : 'https://testnet.algoexplorer.io';
  return `${baseUrl}/asset/${assetId}`;
};

module.exports = {
  microAlgosToAlgos,
  algosToMicroAlgos,
  isValidAddress,
  formatAddress,
  getExplorerTxUrl,
  getExplorerAddressUrl,
  getExplorerAssetUrl
};
