const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);

// the code functionality
/*This code defines a mongoose schema for a Post model, which represents a post in your application. Here's an explanation of the schema:

    The code requires the mongoose module, which is an Object Data Modeling (ODM) library for MongoDB and Node.js.

    The PostSchema is defined using mongoose.Schema. It describes the structure and properties of a Post document.

    The PostSchema has the following fields:

        title: A string field that represents the title of the post. It is required, meaning a value must be provided when creating a new post.

        image: A string field that stores the URL or path to the image associated with the post. It is also required.

        cloudinaryId: A string field that stores the public ID of the image in Cloudinary. This is used for reference and retrieval of the image.

        caption: A string field that represents the caption or description of the post. It is required.

        likes: A number field that stores the count of likes for the post. It is required.

        user: A reference to the User model. It is stored as a mongoose ObjectId and refers to the user who created the post. The ref option specifies the referenced model as "User".

        createdAt: A date field that stores the creation timestamp of the post. It has a default value of the current date and time.

    Finally, the PostSchema is compiled into a mongoose model using mongoose.model(). The model is named "Post" and will be used to interact with the posts collection in the MongoDB database.

By exporting this Post model, other parts of the code can import it and perform CRUD operations on the posts collection, such as creating new posts, retrieving posts, updating likes, and deleting posts.*/




