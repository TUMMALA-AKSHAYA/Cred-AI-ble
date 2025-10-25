const algosdk = require('algosdk');

// Algorand TestNet configuration
const algodToken = '';
const algodServer = 'https://testnet-api.algonode.cloud';
const algodPort = '';

const indexerServer = 'https://testnet-idx.algonode.cloud';
const indexerPort = '';

// Initialize Algorand client
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
const indexerClient = new algosdk.Indexer(algodToken, indexerServer, indexerPort);

// Platform treasury account (you'll generate this)
const TREASURY_MNEMONIC = process.env.ALGORAND_TREASURY_MNEMONIC;
let treasuryAccount = null;

if (TREASURY_MNEMONIC) {
  treasuryAccount = algosdk.mnemonicToSecretKey(TREASURY_MNEMONIC);
}

/**
 * Create a new Algorand account
 */
const createAccount = () => {
  const account = algosdk.generateAccount();
  const mnemonic = algosdk.secretKeyToMnemonic(account.sk);
  
  return {
    address: account.addr,
    mnemonic: mnemonic
  };
};

/**
 * Get account balance
 */
const getBalance = async (address) => {
  try {
    const accountInfo = await algodClient.accountInformation(address).do();
    return {
      balance: accountInfo.amount / 1000000, // Convert microAlgos to Algos
      assets: accountInfo.assets || []
    };
  } catch (error) {
    console.error('Error getting balance:', error);
    throw error;
  }
};

/**
 * Create NFT Badge for skill achievement
 */
const createSkillBadge = async (recipientAddress, metadata) => {
  try {
    if (!treasuryAccount) {
      throw new Error('Treasury account not configured');
    }

    const params = await algodClient.getTransactionParams().do();
    
    // NFT metadata
    const assetName = `${metadata.careerPath} Badge`;
    const unitName = 'BADGE';
    const assetURL = metadata.imageUrl || 'https://your-platform.com/badges/default.png';
    const assetMetadataHash = undefined; // Optional: IPFS hash
    const total = 1; // NFT (supply of 1)
    const decimals = 0;
    const defaultFrozen = false;
    const manager = treasuryAccount.addr;
    const reserve = treasuryAccount.addr;
    const freeze = treasuryAccount.addr;
    const clawback = treasuryAccount.addr;
    
    // Create asset
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: treasuryAccount.addr,
      total,
      decimals,
      assetName,
      unitName,
      assetURL,
      assetMetadataHash,
      defaultFrozen,
      freeze,
      manager,
      clawback,
      reserve,
      suggestedParams: params,
      note: algosdk.encodeObj({
        type: 'skill_badge',
        score: metadata.score,
        percentile: metadata.percentile,
        date: new Date().toISOString(),
        career: metadata.careerPath
      })
    });

    // Sign transaction
    const signedTxn = txn.signTxn(treasuryAccount.sk);
    
    // Submit transaction
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    
    // Wait for confirmation
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
    const assetId = confirmedTxn['asset-index'];
    
    // Transfer NFT to recipient
    await transferAsset(assetId, recipientAddress, 1);
    
    return {
      assetId,
      txId,
      explorerUrl: `https://testnet.algoexplorer.io/tx/${txId}`
    };
  } catch (error) {
    console.error('Error creating skill badge:', error);
    throw error;
  }
};

/**
 * Transfer asset to recipient
 */
const transferAsset = async (assetId, recipientAddress, amount) => {
  try {
    if (!treasuryAccount) {
      throw new Error('Treasury account not configured');
    }

    const params = await algodClient.getTransactionParams().do();
    
    // Recipient must opt-in to receive the asset first
    // This is typically done on the frontend
    
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: treasuryAccount.addr,
      to: recipientAddress,
      amount: amount,
      assetIndex: assetId,
      suggestedParams: params
    });

    const signedTxn = txn.signTxn(treasuryAccount.sk);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    
    await algosdk.waitForConfirmation(algodClient, txId, 4);
    
    return {
      txId,
      explorerUrl: `https://testnet.algoexplorer.io/tx/${txId}`
    };
  } catch (error) {
    console.error('Error transferring asset:', error);
    throw error;
  }
};

/**
 * Reward user with platform tokens
 */
const rewardTokens = async (recipientAddress, amount, reason) => {
  try {
    if (!treasuryAccount) {
      throw new Error('Treasury account not configured');
    }

    const params = await algodClient.getTransactionParams().do();
    
    // Create payment transaction (ALGO tokens)
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: treasuryAccount.addr,
      to: recipientAddress,
      amount: amount * 1000000, // Convert to microAlgos
      note: algosdk.encodeObj({
        type: 'reward',
        reason: reason,
        date: new Date().toISOString()
      }),
      suggestedParams: params
    });

    const signedTxn = txn.signTxn(treasuryAccount.sk);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    
    await algosdk.waitForConfirmation(algodClient, txId, 4);
    
    return {
      txId,
      amount,
      explorerUrl: `https://testnet.algoexplorer.io/tx/${txId}`
    };
  } catch (error) {
    console.error('Error rewarding tokens:', error);
    throw error;
  }
};

/**
 * Store achievement on blockchain
 */
const storeAchievement = async (userAddress, achievementData) => {
  try {
    if (!treasuryAccount) {
      throw new Error('Treasury account not configured');
    }

    const params = await algodClient.getTransactionParams().do();
    
    // Create a note transaction to store data on-chain
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: treasuryAccount.addr,
      to: userAddress,
      amount: 0, // Zero amount, just storing data
      note: algosdk.encodeObj({
        type: 'achievement',
        career: achievementData.career,
        score: achievementData.score,
        percentile: achievementData.percentile,
        date: new Date().toISOString(),
        topics: achievementData.weakAreas
      }),
      suggestedParams: params
    });

    const signedTxn = txn.signTxn(treasuryAccount.sk);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    
    await algosdk.waitForConfirmation(algodClient, txId, 4);
    
    return {
      txId,
      explorerUrl: `https://testnet.algoexplorer.io/tx/${txId}`
    };
  } catch (error) {
    console.error('Error storing achievement:', error);
    throw error;
  }
};

/**
 * Get user's achievements from blockchain
 */
const getUserAchievements = async (userAddress) => {
  try {
    const transactions = await indexerClient
      .searchForTransactions()
      .address(userAddress)
      .notePrefix(Buffer.from('achievement').toString('base64'))
      .do();
    
    const achievements = transactions.transactions.map(tx => {
      if (tx.note) {
        const decoded = algosdk.decodeObj(Buffer.from(tx.note, 'base64'));
        return {
          ...decoded,
          txId: tx.id,
          timestamp: tx['round-time']
        };
      }
      return null;
    }).filter(a => a !== null);
    
    return achievements;
  } catch (error) {
    console.error('Error getting achievements:', error);
    throw error;
  }
};

/**
 * Get user's NFT badges
 */
const getUserBadges = async (userAddress) => {
  try {
    const accountInfo = await algodClient.accountInformation(userAddress).do();
    const assets = accountInfo.assets || [];
    
    const badges = [];
    for (const asset of assets) {
      if (asset.amount > 0) {
        const assetInfo = await algodClient.getAssetByID(asset['asset-id']).do();
        if (assetInfo.params['unit-name'] === 'BADGE') {
          badges.push({
            assetId: asset['asset-id'],
            name: assetInfo.params.name,
            url: assetInfo.params.url,
            amount: asset.amount
          });
        }
      }
    }
    
    return badges;
  } catch (error) {
    console.error('Error getting badges:', error);
    throw error;
  }
};

/**
 * Verify transaction
 */
const verifyTransaction = async (txId) => {
  try {
    const transaction = await indexerClient
      .searchForTransactions()
      .txid(txId)
      .do();
    
    if (transaction.transactions.length > 0) {
      return {
        verified: true,
        transaction: transaction.transactions[0]
      };
    }
    
    return { verified: false };
  } catch (error) {
    console.error('Error verifying transaction:', error);
    throw error;
  }
};

module.exports = {
  createAccount,
  getBalance,
  createSkillBadge,
  rewardTokens,
  storeAchievement,
  getUserAchievements,
  getUserBadges,
  verifyTransaction,
  algodClient,
  indexerClient
};
