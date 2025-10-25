const express = require('express');
const router = express.Router();
const algorandService = require('../services/algorandService');

// @route   POST /api/algorand/create-account
// @desc    Create new Algorand account for user
// @access  Public
router.post('/create-account', async (req, res) => {
  try {
    const account = algorandService.createAccount();
    
    res.json({
      success: true,
      data: {
        address: account.address,
        mnemonic: account.mnemonic,
        message: 'IMPORTANT: Save your mnemonic phrase securely!'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/algorand/balance/:address
// @desc    Get account balance
// @access  Public
router.get('/balance/:address', async (req, res) => {
  try {
    const balance = await algorandService.getBalance(req.params.address);
    
    res.json({
      success: true,
      data: balance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/algorand/mint-badge
// @desc    Mint NFT badge for skill achievement
// @access  Public (should be protected in production)
router.post('/mint-badge', async (req, res) => {
  try {
    const { recipientAddress, careerPath, score, percentile, imageUrl } = req.body;
    
    if (!recipientAddress || !careerPath || score === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    const result = await algorandService.createSkillBadge(recipientAddress, {
      careerPath,
      score,
      percentile,
      imageUrl
    });
    
    res.json({
      success: true,
      data: result,
      message: 'Skill badge minted successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/algorand/reward
// @desc    Reward user with tokens
// @access  Public (should be protected in production)
router.post('/reward', async (req, res) => {
  try {
    const { recipientAddress, amount, reason } = req.body;
    
    if (!recipientAddress || !amount || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    const result = await algorandService.rewardTokens(
      recipientAddress,
      amount,
      reason
    );
    
    res.json({
      success: true,
      data: result,
      message: `Rewarded ${amount} ALGO tokens!`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/algorand/store-achievement
// @desc    Store achievement on blockchain
// @access  Public (should be protected in production)
router.post('/store-achievement', async (req, res) => {
  try {
    const { userAddress, career, score, percentile, weakAreas } = req.body;
    
    if (!userAddress || !career || score === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    const result = await algorandService.storeAchievement(userAddress, {
      career,
      score,
      percentile,
      weakAreas
    });
    
    res.json({
      success: true,
      data: result,
      message: 'Achievement stored on blockchain!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/algorand/achievements/:address
// @desc    Get user's achievements from blockchain
// @access  Public
router.get('/achievements/:address', async (req, res) => {
  try {
    const achievements = await algorandService.getUserAchievements(req.params.address);
    
    res.json({
      success: true,
      count: achievements.length,
      data: achievements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/algorand/badges/:address
// @desc    Get user's NFT badges
// @access  Public
router.get('/badges/:address', async (req, res) => {
  try {
    const badges = await algorandService.getUserBadges(req.params.address);
    
    res.json({
      success: true,
      count: badges.length,
      data: badges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/algorand/verify/:txId
// @desc    Verify transaction on blockchain
// @access  Public
router.get('/verify/:txId', async (req, res) => {
  try {
    const result = await algorandService.verifyTransaction(req.params.txId);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
