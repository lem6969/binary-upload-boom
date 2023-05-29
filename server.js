const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});



// the code functionality
/* This code sets up a basic Express.js server with various middleware and configuration. Let's break down its functions:

    Importing Required Modules:
        The code starts by importing necessary modules using require. These modules include express, mongoose, passport, express-session, connect-mongo, method-override, express-flash, morgan (logging), and custom modules like database, mainRoutes, and postRoutes.

    Environment Configuration:
        The dotenv module is used to load environment variables from a .env file located in the config folder.

    Passport Configuration:
        The code requires and configures Passport authentication by passing the passport object to the ./config/passport file. This file likely contains the configuration for Passport's strategies and serialization/deserialization methods.

    Database Connection:
        The connectDB function (presumably defined in the ./config/database file) is called to establish a connection to the database using Mongoose.

    View Engine and Static Folder:
        The code sets the view engine to EJS (app.set("view engine", "ejs")) and serves static files from the "public" folder (app.use(express.static("public"))).

    Body Parsing and Logging:
        The code sets up body parsing for URL-encoded and JSON data using express.urlencoded() and express.json().
        The morgan module is used for logging HTTP requests in the development environment (app.use(logger("dev"))).

    Method Override:
        The method-override middleware allows the use of HTTP verbs like PUT and DELETE by overriding the HTTP method using a special query parameter or header (app.use(methodOverride("_method"))).

    Sessions and Session Store:
        The code configures sessions using express-session middleware. It sets a session secret, disables resaving and uninitialized session saving, and configures the session store to use connect-mongo to store sessions in the MongoDB database (app.use(session(...))).

    Passport Middleware:
        Passport middleware is initialized using app.use(passport.initialize()) and app.use(passport.session()). This enables persistent login sessions.

    Flash Messages:
        The code uses express-flash middleware to display flash messages for errors, information, etc. (app.use(flash())).

    Routing:
        The code sets up routes using the imported mainRoutes and postRoutes. Requests starting with "/" will be handled by mainRoutes, and requests starting with "/post" will be handled by postRoutes.

    Server Listening:
        The code starts the server by calling the listen method on the Express application, specifying the port to listen on from the environment variables (process.env.PORT).

    Console Logging:
        Upon successful server startup, a message is logged to the console.*/





