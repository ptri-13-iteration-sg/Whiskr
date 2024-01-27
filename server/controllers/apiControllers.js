const model = require('../models/models.js');
const apiControllers = {};

apiControllers.getCatsData = async (req, res, next) => {
  console.log('apiControllers.getCatsdata is active');
  try {
    const cats = await model.Cat.find();
    res.locals.cats = cats;
    // console.log('res.locals.cats:', res.locals.cats);
    return next();
  } catch (err) {
    return next(err);
  }
};

apiControllers.getAdoptersData = async (req, res, next) => {
  console.log('apiControllers.getAdoptersdata is active');
  try {
    const adopters = await model.Adopter.find();
    res.locals.adopters = adopters;
    // console.log('res.locals.adopters:', res.locals.adopters);
    return next();
  } catch (err) {
    return next(err);
  }
};

apiControllers.getMatches = async (req, res, next) => {
  console.log(`Getting matches on account ${req.body.email} `);
  try {
    const matches = await model.Matches.find();
    res.locals.matches = matches;
    // console.log('res.locals.matches:', res.locals.matches)
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = apiControllers;
