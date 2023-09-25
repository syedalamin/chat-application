// external import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const loginRouter = require('./router/loginRouter')
const inboxRouter = require('./router/inboxRouter')
const usersRouter = require('./router/usersRouter')
// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

// database connection

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => console.log(err));

// request parsers

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engin
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

// 404 error handling
app.use(notFoundHandler),

// common error handler
app.use(errorHandler)

// listen
app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
