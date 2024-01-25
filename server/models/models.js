// Modules
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

dotenv.config();

const SALT_FACTOR = Number(process.env.SALT_WORK_FACTOR);
console.log(`* Checking properties from '.env' file: \n  - SALT_FACTOR: ${SALT_FACTOR}`);

// User Schema
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileType: {
    type: String,
    required: true,
  },
});

// Hash password before storing in User db...
userSchema.pre("save", function (next) {
  console.log("* Hashing password before adding user to db...");
  const user = this;
  console.log("  - User password: ", user.password);

  bcrypt.hash(user.password, SALT_FACTOR, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    console.log("  - Hashed user password: ", user.password);
    return next();
  });
});

// Adopter Profile Schema
const adopterSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  aboutMe: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});

// Cat Profile Schema
const catSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  aboutMe: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

//Matches schema is for mvp demonstration only
const matchesSchema = new Schema({
  name: { type: String },
  imageUrl: { type: String },
});

const User = mongoose.model("User", userSchema);
const Adopter = mongoose.model("Adopter", adopterSchema);
const Cat = mongoose.model("Cat", catSchema);
const Matches = mongoose.model("Matches", matchesSchema);

module.exports = { User, Adopter, Cat, Matches };
