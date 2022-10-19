const express = require("express");
const path = require("path");
const port = 9898;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded()) //Middelware to read send data
app.use(express.static('assets'));

// MiddleWare 1
app.use(function(req,res,next){
    req.MyName = "rohit";
    console.log("Inside Middleware 1")
    next()
})

// middleware 2
app.use(function(req,res,next){
    console.log("Inside Middleware 2")
    console.log("My used in middle ware 2 :",req.MyName)
    next()
})

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
    console.log("My used in / controller :",req.MyName)
    // console.log(req.body)
  return res.render("index", {
    title: "Contacts List",
    contact_list: contactList,
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Practice Page",
  });
});

app.post("/create_contact", function (req, res) {

    console.log(req.body)

    // contactList.push({
    //     name:name,
    //     phone:phone
    // })

    contactList.push(req.body)

    return res.redirect('/')

//   return res.redirect("/practice");
});

app.get('/delete_contact/:phone',function(req,res){
  // String Param
  console.log(req.params)
  let phone = req.params.phone; 

  // Query params
  // console.log(req.query)
  // let phone = req.query.phone

  let contactIndex = contactList.findIndex(contact => contact.phone == phone)

  if(contactIndex >= 0){
    contactList.splice(contactIndex,1)
  }
   res.redirect('back')
})

app.listen(port, function (error) {
  if (error) {
    console.log("this is the error", error);
  } else {
    console.log("server is up and running on port ", port);
  }
});
