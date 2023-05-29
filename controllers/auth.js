const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/profile");
        });
      });
    }
  );
};


//the code functionality

/*This code exports several functions related to user authentication and account management using Passport.js, validator, and the User model.

Here's an explanation of each function:

    getLogin:
        This function handles GET requests to the "/login" route.
        If the user is already authenticated (req.user exists), it redirects to the "/profile" route.
        Otherwise, it renders the "login" view, passing the title as "Login".

    postLogin:
        This function handles POST requests to the "/login" route.
        It performs validation checks on the email and password inputs using the validator module.
        If there are validation errors, they are flashed to the session and the user is redirected back to the "/login" route.
        The email is normalized using validator.normalizeEmail() to ensure consistent formatting.
        passport.authenticate("local", ...) is called to authenticate the user using the "local" strategy.
        Inside the authentication callback, it checks for errors and if the user is not found, flashes an error message and redirects back to the "/login" route.
        If the user is found and the password is correct, req.logIn() is called to establish a session and the user is redirected to the "/profile" route.
        If there are any errors during the authentication process, the error is passed to the next middleware.

    logout:
        This function handles GET requests to the "/logout" route.
        It calls req.logout() to remove the user's session.
        req.session.destroy() is called to destroy the session, and any errors are logged to the console.
        The user object is set to null (req.user = null).
        Finally, it redirects the user to the "/" route.

    getSignup:
        This function handles GET requests to the "/signup" route.
        If the user is already authenticated, it redirects to the "/profile" route.
        Otherwise, it renders the "signup" view, passing the title as "Create Account".

    postSignup:
        This function handles POST requests to the "/signup" route.
        It performs validation checks on the email, password, and confirmPassword inputs using the validator module.
        If there are validation errors, they are flashed to the session and the user is redirected back to the "../signup" route.
        The email is normalized using validator.normalizeEmail() to ensure consistent formatting.
        A new User instance is created with the provided userName, email, and password.
        It checks if the email or username already exists in the database using User.findOne().
        If there is an existing user, an error message is flashed and the user is redirected back to the "../signup" route.
        If there are no existing users, the new user is saved to the database and req.logIn() is called to establish a session.
        Finally, the user is redirected to the "/profile" route.

The code utilizes the Passport.js middleware for authentication and integrates with the User model to handle user login, logout, and signup functionality. It also uses the validator module for input validation and the flash module for storing flash messages in the session.*/







