const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;

// the code functionality

/*This code sets up the main routes for your application using the Express Router. Here's an explanation of the code:

    The code requires the express module and creates an instance of the Router object using express.Router(). The Router object allows you to define routes for your application.

    The code requires various controller modules (authController, homeController, postsController) and middleware (ensureAuth, ensureGuest) used for handling different routes.

    The main routes are defined using the router object:

        The root route ("/") is handled by the homeController.getIndex function, which renders the "index.ejs" template.

        The "/profile" route requires authentication (ensureAuth middleware) and is handled by the postsController.getProfile function, which retrieves posts related to the authenticated user and renders the "profile.ejs" template.

        The "/feed" route requires authentication and is handled by the postsController.getFeed function, which retrieves all posts and renders the "feed.ejs" template.

        The "/login" route is handled by the authController.getLogin function, which renders the "login.ejs" template.

        The "/login" route (POST method) is handled by the authController.postLogin function, which performs authentication and redirects the user to the appropriate page based on the result.

        The "/logout" route is handled by the authController.logout function, which logs out the user and destroys the session.

        The "/signup" route is handled by the authController.getSignup function, which renders the "signup.ejs" template.

        The "/signup" route (POST method) is handled by the authController.postSignup function, which creates a new user and logs them in.

    Finally, the router object is exported to make it available to other parts of your application.

This code sets up the basic routes for your application, handling user authentication, profile, feed, and signup. You can add more routes and functionality as needed.*/
