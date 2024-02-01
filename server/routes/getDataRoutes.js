// Modules
const router = require("express").Router();
const path = require("path");

// Controller Files
const getDataController = require("../controllers/getDataController.js");

router.get("/cats", getDataController.getCatsData, (req, res) => {
  res.json(res.locals.cats);
});

router.get("/adopters", getDataController.getAdoptersData, (req, res) => {
  res.json(res.locals.adopters);
});

router.get("/matches", getDataController.getMatchesData, (req, res) => {
  res.json(res.locals.matches);
});

module.exports = router;
