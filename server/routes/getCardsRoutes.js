// Modules
const router = require("express").Router();
const path = require("path");

// Controller Files
const getCardsController = require("../controllers/getCardsController.js");

router.get("/cats", getCardsController.getCatsData, (req, res) => {
  res.json(res.locals.cats);
});

router.get("/adopters", getCardsController.getAdoptersData, (req, res) => {
  res.json(res.locals.adopters);
});

router.get("/matches", getCardsController.getMatches, (req, res) => {
  res.json(res.locals.matches);
});

module.exports = router;
