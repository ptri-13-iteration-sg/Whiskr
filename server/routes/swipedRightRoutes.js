// Modules
const router = require('express').Router();
const path = require('path');

// Controller Files
const swipedRightController = require('../controllers/swipedRightController.js');

router.patch(
  '/',
  swipedRightController.addLike,
  swipedRightController.checkLikes,
  swipedRightController.addMatch,
  (req, res) => {
    res.json(res.locals.matches);
  }
);

module.exports = router;
