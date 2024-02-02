const model = require('../models/models.js');
const jwt = require('jsonwebtoken');
const { setJwtCookie, handleServerError } = require('../utils/functions');

const cookieController = {};

//Sets session cookie
cookieController.setCookie = async (req, res, next) => {
  console.log('* Setting session cookie...');

  const { email } = req.body;
  console.log('  - set cookie req.body: ', req.body);

  try {
    // Get the user _id and send it to the frontend as a cookie
    const foundAdopter = await model.Adopter.findOne({ email });
    const foundCat = await model.Cat.findOne({ email });

    if (foundAdopter) {
      const adopterId = foundAdopter._id.toString();
      res.cookie('id', adopterId);
    } else if (foundCat) {
      const catId = foundCat._id.toString();
      res.cookie('id', catId);
    }

    // Create a JWT token and send it to the frontend via res.locals
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    setJwtCookie(res, token);
    console.log(token);
    // res.status(201).json({
    //   token: token,
    // });
    res.locals.userLoginInfo.token = token;
    return next();
  } catch (err) {
    handleServerError(res, err);
  }
};

// Reset session cookie on logout

cookieController.deleteCookie = async (req, res, next) => {
  try {
    res.cookie('jwt-cookie', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'User is logged out' });
  } catch (err) {
    handleServerError(res, err);
  }
};

module.exports = cookieController;
