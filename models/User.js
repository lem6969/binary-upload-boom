const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};


module.exports = mongoose.model("User", UserSchema);


// the code functionality

/*This code defines a mongoose schema for a User model, which represents a user in your application. Here's an explanation of the schema:

    The code requires the bcrypt module, which is a library used for hashing passwords.

    The code requires the mongoose module, an Object Data Modeling (ODM) library for MongoDB and Node.js.

    The UserSchema is defined using mongoose.Schema. It describes the structure and properties of a User document.

    The UserSchema has the following fields:

        userName: A string field representing the username of the user. It is marked as unique, meaning each user must have a unique username.

        email: A string field representing the email address of the user. It is also marked as unique.

        password: A string field representing the password of the user.

    The UserSchema defines a pre-save middleware function using pre("save", ...) which executes before saving a user document. It is used to hash the user's password before saving it to the database. It checks if the password has been modified, generates a salt, and hashes the password using bcrypt. The resulting hash is then assigned to the password field of the user document.

    The UserSchema defines a helper method called comparePassword, which is used for comparing a candidate password with the user's hashed password. It uses bcrypt's compare function to compare the candidate password with the hashed password and invokes the provided callback function with the result.

    Finally, the UserSchema is compiled into a mongoose model using mongoose.model(). The model is named "User" and will be used to interact with the users collection in the MongoDB database.

By exporting this User model, other parts of the code can import it and perform operations related to user authentication, such as creating new users, comparing passwords, and validating user credentials.*/





