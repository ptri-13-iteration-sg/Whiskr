// Modules
const router = require("express").Router();

// Controller Files
const userController = require("../controllers/userController.js");
const cookieController = require("../controllers/cookieController.js");

router.post("/", userController.createUser, cookieController.setCookie, (req, res) => {
  return res.status(200).json(res.locals._id);
});

module.exports = router;
