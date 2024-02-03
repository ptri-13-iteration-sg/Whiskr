const model = require('../models/models.js');
const getDataController = {};

// Retrieve cat profiles from cat profiles db
getDataController.getCardsData = async (req, res, next) => {
  console.log('* Retrieving adopter or cat profiles from db...');

  try {
    // Access the userAccountType parameter from the query
    const { accountType } = req.body;

    console.log('  - Received accountType: ', req.body);

    if (accountType === 'Adopter') {
      console.log('  - User is an adopter');
      const catData = await model.Cat.find();
      console.log('  - Cat cards to be rendered: ', catData);
      res.locals.cards = catData;
    } else if (accountType === 'Cat') {
      console.log('  - User is a cat owner');
      const adopterData = await model.Adopter.find();
      console.log('  - Adopter cards to be rendered: ', adopterData);
      res.locals.cards = adopterData;
    }

    return next();
  } catch (err) {
    return next('Error in getDataController.getCatsData: ' + JSON.stringify(err));
  }
};

// Retrieve matches from matches db (for mvp purposes only)
getDataController.getMatchesData = async (req, res, next) => {
  console.log(`* Retrieving matches for current user: `, req.query.currentUserId);

  const currentUserId = req.query.currentUserId;

  try {
    const foundAdopter = await model.Adopter.findOne({ _id: currentUserId });
    const foundCat = await model.Cat.findOne({ _id: currentUserId });

    if (foundAdopter) {
      // console.log('  - Found Adopter: ', foundAdopter);
    } else if (foundCat) {
      // console.log(' - Found Cat: ', foundCat);
    }

    res.locals.matches = foundAdopter ? foundAdopter.matches : foundCat.matches;

    console.log('  - Matches found from db: ', res.locals.matches);
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = getDataController;
