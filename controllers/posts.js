const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};



//the code functionality
/*This code exports an object with multiple functions that handle various actions related to user profiles, posts, and interactions with posts.

Here's an explanation of each function:

    getProfile:
        This function is an asynchronous function that is used to retrieve and render the profile page of the currently logged-in user.
        It first queries the database to find all posts associated with the user (req.user.id).
        The retrieved posts are then passed to the "profile.ejs" view along with the current user object (req.user).
        If an error occurs during the process, it is logged to the console.

    getFeed:
        This function is an asynchronous function that retrieves and renders a feed page that displays all posts in descending order of their creation date (createdAt).
        It retrieves all posts from the database using Post.find() and sorts them by createdAt in descending order.
        The retrieved posts are passed to the "feed.ejs" view.
        If an error occurs during the process, it is logged to the console.

    getPost:
        This function is an asynchronous function that retrieves and renders a single post page based on the provided id parameter.
        It queries the database to find the post with the specified id using Post.findById().
        The retrieved post is then passed to the "post.ejs" view along with the current user object (req.user).
        If an error occurs during the process, it is logged to the console.

    createPost:
        This function is an asynchronous function that handles the creation of a new post.
        It first uploads the image file from the req.file.path to a cloud storage service (e.g., Cloudinary) using the cloudinary.uploader.upload() method.
        Once the image is successfully uploaded, a new post is created in the database using Post.create(), with the necessary information such as title, image URL, caption, likes, and the user ID (req.user.id).
        If the post creation is successful, a success message is logged, and the user is redirected to the "/profile" route.
        If an error occurs during the process, it is logged to the console.

    likePost:
        This function is an asynchronous function that handles the increment of the "likes" count for a specific post.
        It uses Post.findOneAndUpdate() to find the post with the provided id parameter and increments the "likes" field by 1 using $inc.
        After the update is successful, a success message is logged, and the user is redirected to the specific post page (/post/:id).
        If an error occurs during the process, it is logged to the console.

    deletePost:
        This function is an asynchronous function that handles the deletion of a specific post.
        It first retrieves the post with the provided id parameter using Post.findById().
        The image associated with the post is deleted from the cloud storage service (e.g., Cloudinary) using cloudinary.uploader.destroy().
        Then, the post is removed from the database using Post.remove().
        If the deletion is successful, a success message is logged, and the user is redirected to the "/profile" route.
        If an error occurs during the process, the user is redirected to the "/profile" route.

The code assumes the existence of a middleware module called "cloudinary" and a model called "Post" that interacts with the database to perform CRUD operations on posts.*/








