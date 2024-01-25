// Modules
const router = require("express").Router();
const path = require("path");

// Controller Files
const apiController = require("../controllers/apiController.js");

router.get("/cats", apiController.getCatsData, (req, res) => {
  res.json(res.locals.cats);
});

router.get("/adopters", apiController.getAdoptersData, (req, res) => {
  res.json(res.locals.adopters);
});

router.get("/matches", apiController.getMatches, (req, res) => {
  res.json(res.locals.matches);
});

module.exports = router;
