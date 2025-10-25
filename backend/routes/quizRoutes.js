const express = require('express');
const router = express.Router();

// Define your quiz routes here
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Quiz routes working'
  });
});

module.exports = router;
