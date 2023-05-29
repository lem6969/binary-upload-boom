const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;


// the code functionality

/*This code exports a function called connectDB that establishes a connection to a MongoDB database using Mongoose.

Here's how it works:

    Importing the Required Modules:
        The code imports the mongoose module, which is an Object Data Modeling (ODM) library for MongoDB.

    connectDB Function:
        This function is declared as an asynchronous function (async keyword) to allow the use of await inside it.
        Inside the function, a try-catch block is used to handle any potential errors during the database connection process.

    Database Connection:
        The mongoose.connect() method is called to connect to the MongoDB database.
        The process.env.DB_STRING is used to get the database connection string from environment variables (presumably defined in a .env file).
        The connect() method returns a promise, so await is used to wait for the connection to be established.

    Connection Configuration Options:
        Several options are passed as the second argument to the mongoose.connect() method to configure the connection:
            useNewUrlParser: true indicates that the MongoDB driver should use the new URL parser.
            useUnifiedTopology: true enables the new unified topology engine for monitoring server and replica set status.
            useFindAndModify: false disables the use of deprecated findOneAndUpdate() and findOneAndRemove() methods in favor of updateOne() and deleteOne().
            useCreateIndex: true enables the use of createIndex() instead of the deprecated ensureIndex() for index creation.

    Logging the Connection:
        If the connection is successfully established, a message is logged to the console using console.log(). It includes the host of the connected database (conn.connection.host).

    Error Handling:
        If an error occurs during the connection process, it is caught in the catch block.
        The error is logged to the console using console.error().
        Finally, the process is exited with an exit code of 1 (process.exit(1)) to indicate a failure.

    Exporting the Function:
        The connectDB function is exported using module.exports, allowing other parts of the code to import and use it.

This code serves as a reusable function to establish a connection to a MongoDB database using Mongoose, with proper configuration and error handling. Other parts of the code can import and call this function as needed.*/
