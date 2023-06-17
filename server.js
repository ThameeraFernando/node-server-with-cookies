const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the http cookie server");
});

// a get route for adding a cookie
app.get("/setcookie", (req, res) => {
  res.cookie("Cookie token name", "Cookie encrypt value", {
    maxAge: 100000,
    // secure: true,
    httpOnly: true,
    sameSite: "lax",
  });
  res.send("Cookie have been saved successfully");
});

// get the cookie from incoming request
app.get("/getcookie", (req, res) => {
  const cookie = req.cookies;
  //   console.log(cookie);
  res.send(cookie);
});

// delete the saved cookie
app.get("/deletecookie", (req, res) => {
  // show the saved cookies
  res.clearCookie("Cookie token name");
  res.send("Cookie has been deleted successfully");
});

app.listen(PORT, () => {
  console.log(`server is running on port :${PORT}`);
});
