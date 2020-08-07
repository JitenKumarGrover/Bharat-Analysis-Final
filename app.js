//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require('lodash');
const NewsAPI = require('newsapi');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin-bharat-analysis:bharatanalysis123@cluster0.jf9wy.mongodb.net/topic", {useNewUrlParser: true , useUnifiedTopology: true });

const headlinesSchema = {
  topic: String,
 };
 const Headlines = mongoose.model("Headlines", headlinesSchema);

// Headlines.findById({_id: "5f2ae5e0a8fdfb34783fde32" }, function(err, foundData){
//   if (err) {
//     res.send(err);
//   } else {
//    var head_topic = foundData.topic;
//   }
//   console.log(head_topic);
//   // module.exports = {head_topic};
// });

const questionsSchema = {
question: String,
choices: [
    {
        value: String,
        votes: Number
    }
]
};
const Questions = mongoose.model("Questions", questionsSchema);



app.get("/",function(req,res){
  Headlines.findById({_id: "5f2ae5e0a8fdfb34783fde32" }, function(err, foundData){
    res.render("home", {
      topics : foundData.topic
    });
  })
});


app.get("/about",function(req,res){
  res.render("about")
  });


app.get("/contest",function(req,res){
    Questions.find({}, function(err, questions){
      res.render("contest", {
      questions : questions
    });
  })
  // Questions.find({}, function(err, questions){
  //   res.render("contest", {
  //     question : Questions.question,
  //     });
  // });
      });


app.get("/blog",function(req,res){
       res.render("blog")
      });


app.get("/contact",function(req,res){
  res.render("contact")
  });


app.get("/topic",function(req,res){
    res.render("topic")
    });
app.post("/topic", function(req,res){
  Headlines.findByIdAndUpdate(
    { _id: "5f2ae5e0a8fdfb34783fde32" },
    { topic: req.body.headlinesTitle},
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/");
            }
    }
  );
    // const headlines= new Headlines ({
    //     topic: req.body.headlinesTitle,
    //   });
    // headlines.save(function(err){
    //     if (!err){
    //       res.redirect("/");
    //     }
    //   });
});

app.get("/questions",function(req,res){
   res.render("questions")
   });

app.post("/questions", function(req,res){
    const questions= new Questions ({
          question : req.body.question,
        });
      questions.save(function(err){
          if (!err){
            res.redirect("/contest");
          }
        });
  });

app.listen(process.env.PORT || 443, function() {
  console.log("Server started on port 443");
});