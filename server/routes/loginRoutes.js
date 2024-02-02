// Modules
const router = require('express').Router();

// Controller Files
const loginController = require('../controllers/loginController.js');
const cookieController = require('../controllers/cookieController.js');

router.post(
  '/',
  loginController.verifyUser,
  loginController.verifyAdopterOrCat,
  cookieController.setCookie,
  (req, res) => {
    console.log('res.locals.userLoginInfo: ', res.locals.userLoginInfo);
    res.json(res.locals.userLoginInfo);
  }
);

router.post('/getAccountType', loginController.getAccountType, (req, res) => {
  res.json(res.locals.accountType);
});

router.post('/createAdopterProfile', loginController.createAdopter, (req, res) => {
  return res.status(200).json(res.locals._id);
});

router.post('/createCatProfile', loginController.createCat, (req, res) => {
  return res.status(200).json(res.locals._id);
});

// Route for handling Google OAuth Login
router.post('/google', loginController.verifyGoogleUser);

module.exports = router;
