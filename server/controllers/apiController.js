const model = require("../models/models.js");
const apiController = {};

// Retrieve cat profiles from cat profiles db
apiController.getCatsData = async (req, res, next) => {
  console.log("* Retrieving cat profiles from db...");

  try {
    const cats = await model.Cat.find();
    res.locals.cats = cats;
    return next();
  } catch (err) {
    return next("Error in apiController.getCatsData: " + JSON.stringify(err));
  }
};

// Retrieve adopter profiles from adopter profiles db
apiController.getAdoptersData = async (req, res, next) => {
  console.log("* Retrieving adopter profiles from db...");
  try {
    const adopters = await model.Adopter.find();
    res.locals.adopters = adopters;
    return next();
  } catch (err) {
    return next("Error in apiController.getAdoptersData: " + JSON.stringify(err));
  }
};

// Retrieve matches from matches db (for mvp purposes only)
apiController.getMatches = async (req, res, next) => {
  console.log(`* Retrieving matches for ${req.body.email}`);
  try {
    const matches = await model.Matches.find();
    res.locals.matches = matches;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = apiController;
