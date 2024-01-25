// Modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // NOTE Line 1
const cookieParser = require("cookie-parser");

// Route Files
const loginRoutes = require("./routes/loginRoutes.js");
const signupRoutes = require("./routes/signupRoutes.js");
const apiRoutes = require("./routes/apiRoutes.js");

dotenv.config(); // NOTE Line 2
const app = express();

// Configs
const PORT = process.env.SERV_PORT;

app.use(express.json());
// app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cookieParser());

const MONGO_URI = process.env.MONGO_URI;
console.log(
  `* Checking properties from '.env' file: \n  - PORT: ${PORT}\n  - MONGO_URI: ${MONGO_URI}`
);

app.use(express.json()); // enables server to parse JSON data sent in the body of reqs
// app.use(express.static(path.resolve(__dirname, '../build'))); // NOTE May not be needed - during development w/ webpack, you can rely on webpack dev server for serving static assets (this line becomes more relevant when deploying to a production server where you want Express to handle static file serving)

// Connect to Mongo DB
mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: "whiskr",
  })
  .then(() => console.log("* Connected to Mongo DB."))
  .catch((err) => console.log(err));

// Route handlers
app.use("/api", apiRoutes);
app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(`> ${errorObj.log} -> ${errorObj.message.err}`);
  return res.status(errorObj.status).json(errorObj.message.err);
});

// Turn computer into a server and listen for incoming reqs
app.listen(PORT, () => {
  console.log(`* Server listening @ http://localhost:${PORT}`);
});

module.exports = app; // Why is this export needed?
