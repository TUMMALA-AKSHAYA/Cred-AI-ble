import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Algorand blockchain operations
export const algorandAPI = {
  // Create new Algorand account
  createAccount: async () => {
    try {
      const response = await api.post('/algorand/create-account');
      return response.data;
    } catch (error) {
      console.error('Create account error:', error);
      throw error;
    }
  },

  // Get ALGO balance for address
  getBalance: async (address) => {
    try {
      const response = await api.get(`/algorand/balance/${address}`);
      return response.data;
    } catch (error) {
      console.error('Get balance error:', error);
      throw error;
    }
  },

  // Mint NFT badge for achievement
  mintBadge: async (recipientAddress, careerPath, score, percentile) => {
    try {
      const response = await api.post('/algorand/mint-badge', {
        recipientAddress,
        careerPath,
        score,
        percentile
      });
      return response.data;
    } catch (error) {
      console.error('Mint badge error:', error);
      throw error;
    }
  },

  // Store achievement on blockchain
  storeAchievement: async (userAddress, achievementData) => {
    try {
      const response = await api.post('/algorand/store-achievement', {
        userAddress,
        ...achievementData
      });
      return response.data;
    } catch (error) {
      console.error('Store achievement error:', error);
      throw error;
    }
  },

  // Get user's NFT badges
  getUserBadges: async (address) => {
    try {
      const response = await api.get(`/algorand/badges/${address}`);
      return response.data;
    } catch (error) {
      console.error('Get badges error:', error);
      throw error;
    }
  },

  // Get user's on-chain achievements
  getUserAchievements: async (address) => {
    try {
      const response = await api.get(`/algorand/achievements/${address}`);
      return response.data;
    } catch (error) {
      console.error('Get achievements error:', error);
      throw error;
    }
  }
};

export default api;
