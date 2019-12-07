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

mongoose.connect("mongodb://localhost/Articles", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Articles";
var db = mongoose.connection;
db.on("error", function(err){
    console.log(err);
  });

mongoose.connect(MONGODB_URI);


app.get("/", function(req,res){
    newsArticles.find({"saved": false}, function(err,data){
      var hbsObject = {
        scrapedArticle: data
      };
      console.log(hbsObject);
      res.render("index",hbsObject);
    })
  })



  app.get("/saved", function(req,res){
    News.find({"saved": true}, function(err, data){
      var hbsObject = {
        scrapedArticle: data
      };
      // console.log(hbsObject);
      res.render("articles",hbsObject);
    })
  })

//   app.get("/scrape", function(req,res){
    // using axios to scrape the news
    axios.get("https://www.nbcnews.com/us-news").then(function(response){
      const $ = cheerio.load(response.data);
      console.log($);



  })
// })



  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });

  module.exports = app;