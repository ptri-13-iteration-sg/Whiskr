const model = require("../models/models.js");
const swipedRightController = {};

// Add adopter's _id to liked cat's likes array
swipedRightController.addLikeCat = async (req, res, next) => {
  console.log("* Adding adopter to cat's likes array...");

  try {
    const { idLiker, idLiked } = req.body;

    const filter = { _id: idLiked };
    const update = { $push: { likes: idLiker } };

    const updatedProfile = await model.Cat.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(`  - Added adopter's id (${idLiker}) to cat profile: `, updatedProfile);

    return next();
  } catch (err) {
    return next("Error in swipedRightController.addLikeCat: " + JSON.stringify(err));
  }
};

// Check adopter's likes array for liked cat's _id
swipedRightController.checkLikesAdopter = async (req, res, next) => {
  console.log("* Checking adopter's profile to see if cat liked back...");

  try {
    const { idLiker, idLiked } = req.body;

    const adopter = await model.Adopter.findOne({ _id: idLiker });
    console.log(`  - Adopter's (${adopter._id}) likes: `, adopter.likes);

    if (adopter.likes.includes(idLiked)) {
      console.log(`  - Cat liked back!`);
      const filter = { _id: idLiker };
      const update = { $push: { matches: idLiked } };

      updatedProfile = await model.Adopter.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log(`  - New match added for adopter!  ${updatedProfile}`);
    }

    return next();
  } catch (err) {
    return next(
      "Error in swipedRightController.checkLikesAdopter: " + JSON.stringify(err)
    );
  }
};

// Add cat's _id to liked adopter's likes array
swipedRightController.addLikeAdopter = async (req, res, next) => {
  console.log("* Adding cat to adopter's likes array...");

  try {
    const { idLiker, idLiked } = req.body;

    const filter = { _id: idLiked };
    const update = { $push: { likes: idLiker } };

    const updatedProfile = await model.Adopter.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(`  - Added cat's id (${idLiker}) to adopter profile: `, updatedProfile);

    return next();
  } catch (err) {
    return next("Error in swipedRightController.addLikeAdopter: " + JSON.stringify(err));
  }
};

// Check cat's likes array for liked adopter's _id
swipedRightController.checkLikesCat = async (req, res, next) => {
  console.log("* Checking cat's profile to see if adopter liked back...");

  try {
    const { idLiker, idLiked } = req.body;

    const cat = await model.Cat.findOne({ _id: idLiker });
    console.log(`  - Cat's (${cat._id}) likes: `, cat.likes);

    if (cat.likes.includes(idLiked)) {
      console.log(`  - Adopter liked back!`);
      const filter = { _id: idLiker };
      const update = { $push: { matches: idLiked } };

      updatedProfile = await model.Cat.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log(`  - New match added for cat!  ${updatedProfile}`);
    }

    return next();
  } catch (err) {
    return next(
      "Error in swipedRightController.checkLikesAdopter: " + JSON.stringify(err)
    );
  }
};

module.exports = swipedRightController;
