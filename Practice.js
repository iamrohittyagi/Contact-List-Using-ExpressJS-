const express = require("express");
const path = require("path");
const port = 1998;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());

app.use(function (req, res, next) {
  console.log("MiddleWare 1");
  next();
});

var contactList = [
  {
    name: "Rohit",
    phone: "8700437957",
  },
  {
    name: "Deepak",
    phone: "9582399500",
  },
  {
    name: "Aniket",
    phone: "9350608900",
  },
];

app.get("/", function (req, res) {
  res.render("index", {
    title: "Home",
    contact_list: contactList,
  });
});

app.post("/create_contact", function (req, res) {
  contactList.push(req.body);
  res.redirect("/");
});

app.listen(port, function (error) {
  if (error) {
    console.log("Error is ", error);
  } else {
    console.log("Server is up and running on port", port);
  }
});
