const model = require("../models/models.js");
const jwt = require("jsonwebtoken");
const { setJwtCookie, handleServerError } = require("../utils/functions");

const cookieControllers = {};

//Sets session cookie
cookieControllers.setCookie = async (req, res, next) => {
  const { email } = req.body;
  console.log("set cookie req.body->", req.body);
  try {
    // const user = await model.User.findOne({ email });
    // const userID = user._id.toString();
    // console.log('* Setting cookie userID:', userID);
    // res.cookie('id', userID);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    setJwtCookie(res, token);
    console.log(token);
    return next();
  } catch (err) {
    handleServerError(res, err);
  }
};

// Reset session cookie on logout

cookieControllers.deleteCookie = async (req, res, next) => {
  try {
    res.cookie("jwt-cookie", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User is logged out" });
  } catch (err) {
    handleServerError(res, err);
  }
};

module.exports = cookieControllers;
