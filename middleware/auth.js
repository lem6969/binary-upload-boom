module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};


/*This code exports an object with two middleware functions: ensureAuth and ensureGuest.

Here's an explanation of each function:

    ensureAuth:
        This middleware function is used to ensure that a user is authenticated before allowing access to certain routes or resources.
        It checks if the user is authenticated by calling the req.isAuthenticated() method provided by Passport.js.
        If the user is authenticated (req.isAuthenticated() returns true), the middleware calls the next() function to pass control to the next middleware or route handler.
        If the user is not authenticated, it redirects the user to the root ("/") route.

    ensureGuest:
        This middleware function is used to ensure that a user is a guest (not authenticated) before allowing access to certain routes or resources.
        It checks if the user is not authenticated by calling the req.isAuthenticated() method provided by Passport.js.
        If the user is not authenticated (req.isAuthenticated() returns false), the middleware calls the next() function to pass control to the next middleware or route handler.
        If the user is authenticated, it redirects the user to the "/dashboard" route.

Both middleware functions follow the same pattern: they check the authentication status of the user and take appropriate action (either allowing access or redirecting) based on the result.

The ensureAuth middleware is typically used to protect routes that require authentication, ensuring that only authenticated users can access them. On the other hand, the ensureGuest middleware is used to protect routes that should only be accessible to guests (non-authenticated users), such as login or registration pages.

By exporting these middleware functions, other parts of the code can import them and use them to protect routes.*/
