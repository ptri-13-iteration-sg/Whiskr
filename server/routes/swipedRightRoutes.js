// Modules
const router = require("express").Router();
const path = require("path");

// Controller Files
const swipedRightController = require("../controllers/swipedRightController.js");

router.patch(
  "/adopterSwiping",
  swipedRightController.addLikeCat,
  swipedRightController.checkLikesAdopter,
  (req, res) => {
    res.json("SUCCESS");
  }
);

router.patch(
  "/catSwiping",
  swipedRightController.addLikeAdopter,
  swipedRightController.checkLikesCat,
  (req, res) => {
    res.json("SUCCESS");
  }
);

module.exports = router;
