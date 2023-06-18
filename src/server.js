const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  // check if the user is logged in, by checking cookie
  let username = req.cookies.username;
  // render the home page
  return res.render("home", { username });
});

app.get("/login", (req, res) => {
  let bad_auth = req.query.msg ? true : false;
  if (bad_auth) {
    return res.render("login", { error: "Invalid username or password" });
  } else {
    return res.render("login");
  }
});

app.get("/welcome", (req, res) => {
  let username = req.cookies.username;

  return res.render("welcome", {
    username,
  });
});

app.post("/process_login", (req, res) => {
  // get data
  let { username, password } = req.body;
  // fake user data
  const userDetails = {
    username: "Bob",
    password: "12345",
  };
  // basic check
  if (
    username === userDetails["username"] &&
    password === userDetails["password"]
  ) {
    res.cookie("username", username);
    return res.redirect("/welcome");
  } else {
    // redirect with fail msg
    return res.redirect("/login?msg=fail");
  }
});

app.get("/logout", (req, res) => {
  // clear the cookie
  res.clearCookie("username");
  // redirect to login
  return res.redirect("/login");
});

// app.get("/home", (req, res) => {
//   res.send("Welcome to the http cookie server");
// });

// // a get route for adding a cookie
// app.get("/setcookie", (req, res) => {
//   res.cookie("Cookie token name", "Cookie encrypt value", {
//     maxAge: 100000,
//     // secure: true,
//     httpOnly: true,
//     sameSite: "lax",
//   });
//   res.send("Cookie have been saved successfully");
// });

// // get the cookie from incoming request
// app.get("/getcookie", (req, res) => {
//   const cookie = req.cookies;
//   //   console.log(cookie);
//   res.send(cookie);
// });

// // delete the saved cookie
// app.get("/deletecookie", (req, res) => {
//   // show the saved cookies
//   res.clearCookie("Cookie token name");
//   res.send("Cookie has been deleted successfully");
// });

app.listen(PORT, () => {
  console.log(`server is running on port :${PORT}`);
});
