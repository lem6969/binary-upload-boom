const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};


//the code functionality
/*This code exports a function that configures the local authentication strategy for Passport.js using the passport-local module.

Here's how it works:

    Importing the Required Modules:
        The code imports the passport-local module, which provides a LocalStrategy for authenticating with a username and password.
        The mongoose module is imported for interacting with the MongoDB database.
        The User model is imported, presumably representing the user schema and providing methods related to user authentication.

    Exported Function:
        The function takes a passport object as an argument, which is the instance of Passport being configured.

    LocalStrategy Configuration:
        The passport.use() method is called to configure the LocalStrategy.
        The LocalStrategy is created with an options object that specifies the usernameField as "email", indicating that the email will be used as the username for authentication.

    User Authentication:
        Inside the LocalStrategy's callback function, the User.findOne() method is used to find a user in the database based on the provided email.
        If an error occurs during the database query, the error is passed to the done callback using return done(err).
        If no user is found, the done callback is called with null as the second argument and an additional object { msg: ... } to indicate that the authentication failed due to the email not being found.
        If the user is found but does not have a password (likely indicating that the user has registered using a third-party sign-in provider), the done callback is called with appropriate error message.
        If the user has a password, the comparePassword() method is called on the user object to compare the provided password with the stored password.
        If an error occurs during the password comparison, the error is passed to the done callback.
        If the passwords match, the done callback is called with null as the first argument and the user object as the second argument to indicate successful authentication.
        If the passwords do not match, the done callback is called with appropriate error message.

    Serialization and Deserialization:
        The passport.serializeUser() method is called to specify how user objects should be serialized to the session.
        In this case, the user's id property is serialized and passed to the done callback.
        The passport.deserializeUser() method is called to specify how user objects should be deserialized from the session.
        The user's id is passed to the User.findById() method to retrieve the user object from the database, which is then passed to the done callback.

    Exporting the Function:
        The function is exported using module.exports, allowing other parts of the code to import and use it.*/
