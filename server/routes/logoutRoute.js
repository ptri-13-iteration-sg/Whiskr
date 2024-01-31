const router = require("express").Router();
const cookieController = require("../controllers/cookieController.js");

router.post("/", cookieController.deleteCookie);

module.exports = router;
