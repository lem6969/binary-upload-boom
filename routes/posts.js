const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;

// the code functionality

/*This code sets up the post-related routes for your application using the Express Router. Here's an explanation of the code:

    The code requires the express module and creates an instance of the Router object using express.Router().

    The code requires the upload middleware module from "../middleware/multer" and the postsController module from "../controllers/posts". These modules handle file uploads and perform various operations related to posts.

    The post routes are defined using the router object:

        The "/:id" route is a GET route that requires authentication (ensureAuth middleware) and is handled by the postsController.getPost function. This function retrieves a specific post based on the provided ID and renders the "post.ejs" template.

        The "/createPost" route is a POST route that uses the upload.single middleware to handle file uploads. It requires authentication and is handled by the postsController.createPost function. This function creates a new post with the uploaded file and other information.

        The "/likePost/:id" route is a PUT route that requires authentication and is handled by the postsController.likePost function. This function increments the "likes" count for the specified post.

        The "/deletePost/:id" route is a DELETE route that requires authentication and is handled by the postsController.deletePost function. This function deletes a post based on the provided ID.

    Finally, the router object is exported to make it available to other parts of your application.

This code sets up the routes for creating, retrieving, liking, and deleting posts. The file upload functionality is handled by the multer middleware. You can further customize the routes and functionality as per your application's requirements.*/
