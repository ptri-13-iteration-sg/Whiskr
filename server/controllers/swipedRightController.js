const model = require('../models/models.js');
const swipedRightController = {};

// Add sender's _id to recipient's likes
swipedRightController.addLike = async (req, res, next) => {
  console.log("* Adding sender's _id to recipient's likes array...");

  try {
    const { idSender, idRecipient } = req.body;

    // Find the recipient's profile and add sender's _id to it's likes array
    const filter = { _id: idRecipient };
    const update = { $push: { likes: idSender } };
    const adopter = await model.Adopter.findOneAndUpdate(filter, update, {
      new: true,
    });
    const cat = await model.Cat.findOneAndUpdate(filter, update, {
      new: true,
    });

    // Whichever findOneAndUpdate does not return null is the profile type of the recipient
    if (adopter) {
      console.log('  - Recipient is an adopter');
      res.locals.recipientProfileType = 'adopter';
    } else if (cat) {
      console.log('  - Recipient is a cat');
      res.locals.recipientProfileType = 'cat';
    } else {
      console.log('  - Recipient DNE');
    }

    return next();
  } catch (err) {
    return next('Error in swipedRightController.addLikeCat: ' + JSON.stringify(err));
  }
};

// Check sender's likes array for recipient's _id
swipedRightController.checkLikes = async (req, res, next) => {
  console.log("* Checking sender's profile to see if recipient liked back...");

  try {
    const { idSender, idRecipient } = req.body;

    const foundAdopter = await model.Adopter.findOne({ _id: idSender });
    const foundCat = await model.Cat.findOne({ _id: idSender });

    // Whichever findOne does not return null is the profile type of the sender
    if (foundAdopter) {
      console.log('  - Sender is an adopter');
      res.locals.senderProfileType = 'adopter';
      res.locals.likedBack = foundAdopter.likes.includes(idRecipient) ? true : false;
      res.locals.senderProfileMatches = foundAdopter.matches;
    } else if (foundCat) {
      console.log('  - Sender is a cat');
      res.locals.senderProfileType = 'cat';
      res.locals.likedBack = foundCat.likes.includes(idRecipient) ? true : false;
      res.locals.senderProfileMatches = foundCat.matches;
    } else {
      console.log('  - Sender DNE');
    }

    return next();
  } catch (err) {
    return next(
      'Error in swipedRightController.checkLikesAdopter: ' + JSON.stringify(err)
    );
  }
};

// Update matches arrays for both sender and recipient
swipedRightController.addMatch = async (req, res, next) => {
  console.log('* Updating matches array for both sender & recipient...');

  try {
    const { idSender, idRecipient } = req.body;

    console.log('  - res.locals.likedBack: ', res.locals.likedBack);

    // If there is a mutual liking between sender and recipient...
    if (res.locals.likedBack) {
      // If the sender is an adopter...
      if (res.locals.senderProfileType === 'adopter') {
        // Create an object to represent the sender
        const foundAdopter = await model.Adopter.findOne({ _id: idSender });
        const senderObj = {
          _id: idSender,
          name: foundAdopter.name,
          imageUrl: foundAdopter.imageUrl,
          roomId: idSender.slice(-4) + idRecipient.slice(-4),
        };

        // Create an object to represent the recipient
        const foundCat = await model.Cat.findOne({ _id: idRecipient });
        const recipientObj = {
          _id: idRecipient,
          name: foundCat.name,
          imageUrl: foundCat.imageUrl,
          roomId: idSender.slice(-4) + idRecipient.slice(-4),
        };

        // Add sender object to recipient's matches array
        const filterRecipient = { _id: idRecipient };
        const addSenderObj = { $push: { matches: senderObj } };
        await model.Cat.findOneAndUpdate(filterRecipient, addSenderObj, {
          new: true,
        });

        // Add recipient object to sender's matches array
        const filterSender = { _id: idSender };
        const addRecipientObj = { $push: { matches: recipientObj } };
        const updatedSender = await model.Adopter.findOneAndUpdate(
          filterSender,
          addRecipientObj,
          {
            new: true,
          }
        );

        console.log('  - my matches: ', updatedSender.matches);

        // Pass on matches to front end
        res.locals.matches = updatedSender.matches;
        return next();

        // If the sender is a cat...
      } else if (res.locals.senderProfileType === 'cat') {
        // Create an object to represent the sender
        const foundCat = await model.Cat.findOne({ _id: idSender });
        const senderObj = {
          _id: idSender,
          name: foundCat.name,
          imageUrl: foundCat.imageUrl,
          roomId: idSender.slice(-4) + idRecipient.slice(-4),
        };

        // Create an object to represent the recipient
        const foundAdopter = await model.Adopter.findOne({ _id: idRecipient });
        const recipientObj = {
          _id: idRecipient,
          name: foundAdopter.name,
          imageUrl: foundAdopter.imageUrl,
          roomId: idSender.slice(-4) + idRecipient.slice(-4),
        };

        // Add sender object to recipient's matches array
        const filterRecipient = { _id: idRecipient };
        const addSenderObj = { $push: { matches: senderObj } };
        await model.Adopter.findOneAndUpdate(filterRecipient, addSenderObj, {
          new: true,
        });

        // Add recipient object to sender's matches array
        const filterSender = { _id: idSender };
        const addRecipientObj = { $push: { matches: recipientObj } };
        const updatedSender = await model.Cat.findOneAndUpdate(
          filterSender,
          addRecipientObj,
          {
            new: true,
          }
        );

        console.log('  - my matches: ', updatedSender.matches);

        // Pass on matches to front end
        res.locals.matches = updatedSender.matches;
        return next();
      }
    } else {
      res.locals.matches = res.locals.senderProfileMatches;
      return next();
    }
  } catch (err) {
    return next(
      'Error in swipedRightController.checkLikesAdopter: ' + JSON.stringify(err)
    );
  }
};

module.exports = swipedRightController;
