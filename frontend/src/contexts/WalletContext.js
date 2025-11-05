import React, { createContext, useContext, useState, useEffect } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import algosdk from 'algosdk';

const WalletContext = createContext();

const peraWallet = new PeraWalletConnect();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const algodClient = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');

  useEffect(() => {
    // Reconnect to wallet on page reload
    peraWallet.reconnectSession().then((accounts) => {
      if (accounts.length) {
        setWalletAddress(accounts[0]);
        fetchBalance(accounts[0]);
      }
    }).catch((e) => {
      console.log('No session to reconnect');
    });

    peraWallet.connector?.on('disconnect', handleDisconnect);

    return () => {
      peraWallet.connector?.off('disconnect', handleDisconnect);
    };
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const accounts = await peraWallet.connect();
      setWalletAddress(accounts[0]);
      await fetchBalance(accounts[0]);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    peraWallet.disconnect();
    handleDisconnect();
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setBalance(0);
  };

  const fetchBalance = async (address) => {
    try {
      const accountInfo = await algodClient.accountInformation(address).do();
      //const algoBalance = accountInfo.amount / 1000000;
      const algoBalance = Number(accountInfo.amount) / 1000000;
      setBalance(algoBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const value = {
    walletAddress,
    balance,
    loading,
    connectWallet,
    disconnectWallet,
    fetchBalance
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
