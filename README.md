# quick_pound
This is an application which mimics most of the features of one of the most popular social media apps: Instagram <br>
<br>
`THE PROJ LINK`
https://quick-pound.onrender.com <br>
<br>
`THE WHITEBOARD`
https://miro.com/app/board/uXjVMDu8e9Q=/?share_link_id=610003321311
## How It's Made:

**Tech used:** `EJS` `HTML` `JavaScript` `Node.js` `Express` `MongoDB` `Mongoose` `Multer` `Passport.js`

This app allows users to make an account and upload posts with pictures, look at a feed of all user posts, comments on posts, and view user profiles. I used EJS to apply my HTML and Tailwind for the CSS to for the front-end. I used JS for some conditional features like allowing the original poster to delete their comments and/or posts. Node was used to craft the server and all information is stored on MongoDB. Passwords are hashed before storing i put comments in individual folders. 



## Optimizations

I didn't have time to fully design out the app on the front end so that would be the biggest optimization to elevate this project. Another great optimization planned for the future is to allow user to do what Instagram doesn't: edit posts and comments. 

## Lessons Learned:

This projects really helped me solidify my skills in MVC and crafting a full-stack application. This process was much faster and effortless this time around compared to my first full-stack application. 


# Install

`npm install` 

---

# Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

# Run

`npm start` || `npm run start`
