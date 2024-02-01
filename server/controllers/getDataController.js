const model = require("../models/models.js");
const getDataController = {};

// Retrieve cat profiles from cat profiles db
getDataController.getCatsData = async (req, res, next) => {
  console.log("* Retrieving cat profiles from db...");

  try {
    const cats = await model.Cat.find();
    res.locals.cats = cats;
    return next();
  } catch (err) {
    return next("Error in getDataController.getCatsData: " + JSON.stringify(err));
  }
};

// Retrieve adopter profiles from adopter profiles db
getDataController.getAdoptersData = async (req, res, next) => {
  console.log("* Retrieving adopter profiles from db...");

  try {
    const adopters = await model.Adopter.find();
    res.locals.adopters = adopters;
    return next();
  } catch (err) {
    return next("Error in getDataController.getAdoptersData: " + JSON.stringify(err));
  }
};

// Retrieve matches from matches db (for mvp purposes only)
getDataController.getMatchesData = async (req, res, next) => {
  console.log(`* Retrieving matches for current user: `, req.query.currentUserId);

  const currentUserId = req.query.currentUserId;

  try {
    const foundAdopter = await model.Adopter.findOne({ _id: currentUserId });
    const foundCat = await model.Cat.findOne({ _id: currentUserId });

    res.locals.matches = foundAdopter ? foundAdopter.matches : foundCat.matches;

    console.log("  - Matches found from db: ", res.locals.matches);
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = getDataController;
