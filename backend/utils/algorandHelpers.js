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
 * Get AlgoExplorer URL for address
 */
const getExplorerAddressUrl = (address, network = 'testnet') => {
  const baseUrl = network === 'mainnet' 
    ? 'https://algoexplorer.io' 
    : 'https://testnet.algoexplorer.io';
  return `${baseUrl}/address/${address}`;
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
 * Get AlgoExplorer URL for asset
 */
const getExplorerAssetUrl = (assetId, network = 'testnet') => {
  const baseUrl = network === 'mainnet' 
    ? 'https://algoexplorer.io' 
    : 'https://testnet.algoexplorer.io';
  return `${baseUrl}/asset/${assetId}`;
};

/**
 * Wait for transaction confirmation with timeout
 */
const waitForConfirmationWithTimeout = async (algodClient, txId, timeout = 10) => {
  const startRound = (await algodClient.status().do())['last-round'];
  let currentRound = startRound;

  while (currentRound < startRound + timeout) {
    try {
      const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
      if (pendingInfo['confirmed-round'] !== null && pendingInfo['confirmed-round'] > 0) {
        return pendingInfo;
      }
      if (pendingInfo['pool-error'] != null && pendingInfo['pool-error'].length > 0) {
        throw new Error(`Transaction rejected: ${pendingInfo['pool-error']}`);
      }
      await algodClient.statusAfterBlock(currentRound).do();
      currentRound++;
    } catch (error) {
      throw error;
    }
  }
  throw new Error(`Transaction not confirmed after ${timeout} rounds`);
};

/**
 * Parse metadata from transaction note
 */
const parseTransactionNote = (noteBase64) => {
  try {
    const noteBuffer = Buffer.from(noteBase64, 'base64');
    return algosdk.decodeObj(noteBuffer);
  } catch (error) {
    console.error('Error parsing transaction note:', error);
    return null;
  }
};

/**
 * Encode metadata to transaction note
 */
const encodeTransactionNote = (metadata) => {
  try {
    return algosdk.encodeObj(metadata);
  } catch (error) {
    console.error('Error encoding transaction note:', error);
    return undefined;
  }
};

module.exports = {
  microAlgosToAlgos,
  algosToMicroAlgos,
  isValidAddress,
  formatAddress,
  getExplorerAddressUrl,
  getExplorerTxUrl,
  getExplorerAssetUrl,
  waitForConfirmationWithTimeout,
  parseTransactionNote,
  encodeTransactionNote
};
