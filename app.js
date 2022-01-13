//jshint esversion: 8

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const date = require(__dirname + '/date.js');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


const port = process.env.PORT || 3000;

let items = [];
let workItems = [];

app.get("/", (req, res) => {

  let day = date.getDate();

  res.render('list', {
    listTitle: day,
    items: items
  });
});

app.post("/", (req, res)=>{
  let newItem = req.body.newItem;

  if (req.body.list === "Work List") {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    items.push(newItem);
    res.redirect("/");
  }
});

app.get("/work", (req, res)=>{
  res.render('list', {
    listTitle: "Work List",
    items: workItems
  });
});

app.get("/about", (req, res)=>{
  res.render('about');
});

app.post("/about", (req, res)=>{
  let redirectValue = req.body.redirectValue;
  if (redirectValue === "Work List") {
    res.redirect("/work");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`This app is running on port ${port}`);
});
