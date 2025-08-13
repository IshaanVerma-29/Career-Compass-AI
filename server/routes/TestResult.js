const express = require('express');
const router = express.Router();
const {
  saveTestResult,
  getUserTestResults,
  getAllTestResults
} = require('../Controllers/TestResultController');

// Routes
router.post('/save', saveTestResult);
router.get('/user', getUserTestResults);
router.get('/all', getAllTestResults);

module.exports = router;
