const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});


/*This code exports a configuration object for multer, which is a middleware for handling file uploads in Node.js. Here's how it works:

    The code requires the multer module, which provides file upload functionality.

    It also requires the built-in path module, which is used to work with file and directory paths.

    The code exports a configuration object for multer. The configuration object has two properties:

    a. storage: This property specifies the storage engine to be used for storing uploaded files. In this case, it uses multer.diskStorage to store files on the disk. Since no configuration options are provided to multer.diskStorage, it uses the default settings.

    b. fileFilter: This property specifies a function that is called for each uploaded file to determine if it should be accepted or rejected. The function receives three parameters: req (the request object), file (the uploaded file object), and cb (a callback function to indicate whether the file should be accepted or rejected).
        Inside the fileFilter function, the code checks the file extension using path.extname(file.originalname) to extract the extension from the original file name.
        If the extension is not .jpg, .jpeg, or .png, the file is rejected by calling the callback function with an error as the first argument (cb(new Error("File type is not supported"), false)).
        If the extension is one of the supported types, the file is accepted by calling the callback function with null as the first argument and true as the second argument (cb(null, true)).

By exporting this multer configuration object, other parts of the code can import it and use it as middleware to handle file uploads, ensuring that only files with the specified extensions are accepted.
*/
