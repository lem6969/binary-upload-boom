const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;

// the code functionality
/*This code sets up and configures the Cloudinary SDK for image upload and management. Here's how it works:

    The code requires the cloudinary module from the cloudinary package. The .v2 is used to import the version 2 of the Cloudinary SDK.

    It loads environment variables from the .env file located in the ./config directory using dotenv. The environment variables being loaded are CLOUD_NAME, API_KEY, and API_SECRET. These variables are used to authenticate and configure the Cloudinary API.

    The cloudinary.config() function is called with an object containing the Cloudinary configuration options:
        cloud_name is set to the value of the CLOUD_NAME environment variable.
        api_key is set to the value of the API_KEY environment variable.
        api_secret is set to the value of the API_SECRET environment variable.

    Finally, the configured cloudinary object is exported, allowing other parts of the code to use it for image upload and management.

This code sets up the Cloudinary SDK with the provided configuration, allowing you to use Cloudinary's API to upload, store, and manage images in your application.*/
