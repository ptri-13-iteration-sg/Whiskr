// Modules
const router = require('express').Router();
const path = require('path');

// Controller Files
const getDataController = require('../controllers/getDataController.js');

router.post('/cards', getDataController.getCardsData, (req, res) => {
  res.json(res.locals.cards);
});

router.get('/matches', getDataController.getMatchesData, (req, res) => {
  res.json(res.locals.matches);
});

module.exports = router;
