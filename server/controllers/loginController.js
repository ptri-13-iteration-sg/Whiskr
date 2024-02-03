require('dotenv').config();
const Profile = require('../models/models.js');
const loginController = {};
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { setJwtCookie, handleServerError } = require('../utils/functions.js');

// Log in user
loginController.verifyUser = async (req, res, next) => {
  console.log('* Handling logging user in...');

  try {
    const { email, password } = req.body;

    // Handle missing fields
    if ((!email, !password)) {
      const missingFieldsErr = {
        log: 'Express error handler caught loginController.verifyUser error',
        status: 400,
        message: { err: 'Missing required fields' },
      };
      return next(missingFieldsErr);
    }

    // Find user in db
    const foundUser = await Profile.User.findOne({ email: email });
    if (foundUser) console.log('  - User found in db: ', foundUser);
    else {
      const userDneErr = {
        log: 'Express error handler caught loginController.verifyUser error',
        status: 400,
        message: { err: 'Email does not exist in db' },
      };
      return next(userDneErr);
    }

    // Compare user entered password w/ password in db
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (validPassword) {
      console.log('  - Valid passowrd entered: ', foundUser.password);
      // Store email and account type to be passed on
      res.locals.userEmail = foundUser.email;
      res.locals.profileType = foundUser.profileType;
      return next();
    } else {
      const invalidPasswordErr = {
        log: 'Express error handler caught loginController.loginUser error',
        status: 400,
        message: { err: 'Invalid password entered' },
      };
      return next(invalidPasswordErr);
    }
  } catch (err) {
    //catch (err) {
    //return next('Error in loginController.verifyUser: ' + JSON.stringify(err));
    //}
    //};
    console.error('loginController.verifyUser: Error', err);
    next({
      log: 'loginController.verifyUser: Error occurred',
      status: 500,
      message: 'An error occurred during the login process.',
    });
  }
};

// Verify if the logged in user has an Adopter profile or Cat profile
loginController.verifyAdopterOrCat = async (req, res, next) => {
  console.log(
    '* Handling verifying if user has created an adopter profile or cat profile yet...'
  );

  try {
    const userEmail = res.locals.userEmail;
    const profileType = res.locals.profileType;
    console.log('  - Seaching Adopter and Cat Profile DBs for: ', userEmail, profileType);

    if (profileType === 'Adopter') {
      // Check the adopter profile db for the email
      const foundAdopter = await Profile.Adopter.findOne({ email: userEmail });
      if (foundAdopter) {
        console.log('  - Profile found in Adopter profile db: ', foundAdopter);
        res.locals.userLoginInfo = { hasAdopterOrCatProfile: true };
        console.log('res.locals.userLoginInfo: ', res.locals.userLoginInfo);
        return next();
      } else {
        console.log('  - User has not created an Adopter profile');
        res.locals.userLoginInfo = { hasAdopterOrCatProfile: false };
        return next();
      }
    } else if (profileType === 'Cat') {
      // Check the cat profile db for the email
      const foundCat = await Profile.Cat.findOne({ email: userEmail });
      if (foundCat) {
        console.log('  - Profile found in Cat profile db: ', foundCat);
        res.locals.userLoginInfo = { hasAdopterOrCatProfile: true };
        return next();
      } else {
        console.log('  - User has not created a Cat profile');
        res.locals.userLoginInfo = { hasAdopterOrCatProfile: false };
        return next();
      }
    }
  } catch (err) {
    return next('Error in loginController.verifyAdopterOrCat: ', +JSON.stringify(err));
  }
};

// Get the account type of the user logging in
loginController.getAccountType = async (req, res, next) => {
  console.log('* Handling getting profile type of user...');

  try {
    const { email } = req.body;

    const foundUser = await Profile.User.findOne({ email: email });
    console.log(`  - Profile type for ${email}: `, foundUser.profileType);
    res.locals.accountType = foundUser.profileType;
    return next();
  } catch (err) {
    return next('Error in loginController.getAccountType: ' + JSON.stringify(err));
  }
};

// Register adopter profile
loginController.createAdopter = async (req, res, next) => {
  console.log('* Handling creating an adopter profile for user...');

  const { email, name, aboutMe, imageUrl, profession, experience } = req.body;

  // Handle missing fields - ignores missing imageUrl field
  if (!email || !name || !aboutMe || !profession || !experience) {
    const missingFieldsErr = {
      log: 'Express error handler caught loginController.createAdopter error',
      status: 400,
      message: { err: 'Missing required fields' },
    };
    return next(missingFieldsErr);
  }

  try {
    // Create new adopter from info provided in req body
    const newAdopter = new Profile.Adopter({
      email,
      name,
      aboutMe,
      imageUrl,
      profession,
      experience,
    });

    // Save adopter to 'adopters' db
    const registeredAdopter = await newAdopter.save();
    console.log('* Adopter successfully saved to db: ', registeredAdopter);
    res.locals._id = registeredAdopter._id;
    return next();
  } catch (err) {
    return next('Error in loginController.createAdopter: ' + JSON.stringify(err));
  }
};

// Register cat profile
loginController.createCat = async (req, res, next) => {
  console.log('* Handling creating an cat profile for user...');

  const { email, name, breed, age, aboutMe, imageUrl } = req.body;

  // Handle missing fields - ignores missing imageUrl field
  if (!email || !name || !breed || !age || !aboutMe) {
    const missingFieldsErr = {
      log: 'Express error handler caught loginController.createCat error',
      status: 400,
      message: { err: 'Missing required fields' },
    };
    return next(missingFieldsErr);
  }

  try {
    // Create new adopter from info provided in req body
    const newCat = new Profile.Cat({
      email,
      name,
      breed,
      age,
      aboutMe,
      imageUrl,
    });

    // Save adopter to 'adopters' db
    const registeredCat = await newCat.save();
    console.log('* Cat successfully saved to db: ', registeredCat);
    res.locals._id = registeredCat._id;
    return next();
  } catch (err) {
    return next('Error in loginController.createCat: ' + JSON.stringify(err));
  }
};

loginController.verifyGoogleUser = async (req, res, next) => {
  console.log('Entered verifyGoogleUser');
  try {
    const { token } = req.body; // Token received from the frontend

    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // Check if user exists in database
    let user = await Profile.User.findOne({ email: payload.email });

    // If user doesn't exist, create a new user
    if (!user) {
      user = await Profile.User.create({
        email: payload.email,
        name: payload.name,
        // Add other relevant user fields
      });
    }

    // Generate JWT Token for the user
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    // Set the JWT as an HTTP-only cookie
    setJwtCookie(res, jwtToken);

    // Send the response back to the client
    res.status(200).json({
      message: 'User logged in successfully',
      user: {
        email: user.email,
        name: user.name,
        // Include other user details as necessary
      },
    });
  } catch (error) {
    // Handle error
    handleServerError(res, error);
  }
};

module.exports = loginController;
