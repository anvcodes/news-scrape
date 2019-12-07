var mongoose = require("mongoose");
var express = require("express");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var axios = require("axios");
var newsArticles = require("./models/news")

var PORT = process.env.PORT || 8080;
var app = express();

app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Articles";
var db = mongoose.connection;
db.on("error", function(err){
    console.log(err);
  });

mongoose.connect(MONGODB_URI);


app.get("/", function(req,res){
    newsArticles.find({"saved": false}, function(err,data){
      var hbsObject = {
        article: data
      };
      console.log(hbsObject);
      res.render("index",hbsObject);
    })
  })



