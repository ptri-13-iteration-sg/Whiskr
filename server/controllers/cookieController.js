const model = require('../models/models.js');

const cookieController = {};

cookieController.setCookie = async (req, res, next) => {
  const email = req.body.email;
  try {
    const user = await model.User.findOne({ email });
    const userID = user._id.toString();
    console.log('* Setting cookie userID:', userID);
    res.cookie('id', userID);
    return next();
  } catch (err) {
    console.log('error: ', err);
  }
};

module.exports = cookieController;
