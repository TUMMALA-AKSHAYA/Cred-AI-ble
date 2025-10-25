const express = require('express');
const router = express.Router();

// Define your user routes here
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'User routes working'
  });
});

module.exports = router;
