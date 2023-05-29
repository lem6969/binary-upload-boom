module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
};

// the code functionality
/*This code exports an object with a single function, getIndex, which handles a GET request to the root ("/") route.

Here's an explanation of the code:

    getIndex:
        This function is called when a GET request is made to the root ("/") route.
        It renders the "index.ejs" view using the res.render() method.
        The "index.ejs" view is likely an EJS template file that will be rendered and sent as a response to the client.

The exported object has a key-value pair, where the key is "getIndex" and the value is the function itself.

By exporting this object, other parts of the code can import it and access the getIndex function to handle the root route.*/
