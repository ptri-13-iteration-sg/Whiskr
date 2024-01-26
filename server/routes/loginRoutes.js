// Modules
const router = require("express").Router();

// Controller Files
const loginController = require("../controllers/loginController.js");
const cookieController = require("../controllers/cookieController.js");

router.post(
  "/",
  loginController.verifyUser,
  loginController.verifyAdopterOrCat,
  cookieController.setCookie,
  (req, res) => {
    res.json(res.locals.hasAdopterOrCatProfile);
  }
);

router.post("/getAccountType", loginController.getAccountType, (req, res) => {
  res.json(res.locals.accountType);
});

router.post("/createAdopterProfile", loginController.createAdopter, (req, res) => {
  return res.status(200).json(res.locals._id);
});

router.post("/createCatProfile", loginController.createCat, (req, res) => {
  return res.status(200).json(res.locals._id);
});

module.exports = router;
