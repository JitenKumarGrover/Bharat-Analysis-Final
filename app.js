//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require('lodash');
const NewsAPI = require('newsapi');
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb+srv://admin-bharat-analysis:bharatanalysis123@cluster0.jf9wy.mongodb.net/topic", {useNewUrlParser: true , useUnifiedTopology: true });

const userSchema =  new mongoose.Schema({
  email : String,
  password : String
});
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const headlinesSchema = {
  topic: String,
  topic2: String,
  topic3: String,
  topic4: String,
  topic5: String,
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

const aboutSchema = {
  paragraph : String,
 };
 const Aboutus = mongoose.model("Aboutus", aboutSchema);

const questionsSchema = {
"qtopic": String,
"choices": [
    {
        "value": String,
        vote: Number
    }
]
};
const Questions = mongoose.model("Questions", questionsSchema);


app.get("/",function(req,res){
  Headlines.findById({_id: "5f2ae5e0a8fdfb34783fde32" }, function(err, foundData){
    Headlines.findById({_id: "5f3a2218137d78019844cd84" }, function(err, foundData2){
    Headlines.findById({_id: "5f3a24bf8f57d0327c045241" }, function(err, foundData3){
    Headlines.findById({_id: "5f3a25d676aaef25c86ec91c" }, function(err, foundData4){
    Headlines.findById({_id: "5f3a2725b87f2627dcf157de" }, function(err, foundData5){
    res.render("home", {
      topics: foundData.topic,
      topics2: foundData2.topic2,
      topics3 : foundData3.topic3,
      topics4 : foundData4.topic4,
      topics5 : foundData5.topic5,
    });
  }) }) }) }) })
});
app.get("/topic2",function(req,res){
  Headlines.findById({_id: "5f2ae5e0a8fdfb34783fde32" }, function(err, foundData){
    Headlines.findById({_id: "5f3a2218137d78019844cd84" }, function(err, foundData2){
    Headlines.findById({_id: "5f3a24bf8f57d0327c045241" }, function(err, foundData3){
    Headlines.findById({_id: "5f3a25d676aaef25c86ec91c" }, function(err, foundData4){
    Headlines.findById({_id: "5f3a2725b87f2627dcf157de" }, function(err, foundData5){
    res.render("topic2", {
      topics: foundData.topic,
      topics2: foundData2.topic2,
      topics3 : foundData3.topic3,
      topics4 : foundData4.topic4,
      topics5 : foundData5.topic5,
    });
  }) }) }) }) })
});
app.get("/topic3",function(req,res){
  Headlines.findById({_id: "5f2ae5e0a8fdfb34783fde32" }, function(err, foundData){
    Headlines.findById({_id: "5f3a2218137d78019844cd84" }, function(err, foundData2){
    Headlines.findById({_id: "5f3a24bf8f57d0327c045241" }, function(err, foundData3){
    Headlines.findById({_id: "5f3a25d676aaef25c86ec91c" }, function(err, foundData4){
    Headlines.findById({_id: "5f3a2725b87f2627dcf157de" }, function(err, foundData5){
    res.render("topic3", {
      topics: foundData.topic,
      topics2: foundData2.topic2,
      topics3 : foundData3.topic3,
      topics4 : foundData4.topic4,
      topics5 : foundData5.topic5,
    });
  }) }) }) }) })
});
 app.get("/topic4",function(req,res){
  Headlines.findById({_id: "5f2ae5e0a8fdfb34783fde32" }, function(err, foundData){
    Headlines.findById({_id: "5f3a2218137d78019844cd84" }, function(err, foundData2){
    Headlines.findById({_id: "5f3a24bf8f57d0327c045241" }, function(err, foundData3){
    Headlines.findById({_id: "5f3a25d676aaef25c86ec91c" }, function(err, foundData4){
    Headlines.findById({_id: "5f3a2725b87f2627dcf157de" }, function(err, foundData5){
    res.render("topic4", {
      topics: foundData.topic,
      topics2: foundData2.topic2,
      topics3 : foundData3.topic3,
      topics4 : foundData4.topic4,
      topics5 : foundData5.topic5,
    });
  }) }) }) }) })
});
app.get("/topic5",function(req,res){
  Headlines.findById({_id: "5f2ae5e0a8fdfb34783fde32" }, function(err, foundData){
    Headlines.findById({_id: "5f3a2218137d78019844cd84" }, function(err, foundData2){
    Headlines.findById({_id: "5f3a24bf8f57d0327c045241" }, function(err, foundData3){
    Headlines.findById({_id: "5f3a25d676aaef25c86ec91c" }, function(err, foundData4){
    Headlines.findById({_id: "5f3a2725b87f2627dcf157de" }, function(err, foundData5){
    res.render("topic5", {
      topics: foundData.topic,
      topics2: foundData2.topic2,
      topics3 : foundData3.topic3,
      topics4 : foundData4.topic4,
      topics5 : foundData5.topic5,
    });
  }) }) }) }) })
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.get("/about",function(req,res){
  Aboutus.find({}, function(err, paragraphs){
    res.render("about", {
      paragraphs : paragraphs,
  });
})
});

app.get("/contest",function(req,res){
    Questions.find({}, function(err, questions){
      res.render("contest", {
        questions : questions,
    });
  })
  // Questions.find({}, function(err, questions){
  //   res.render("contest", {
  //     question : Questions.question,
  //     });
  // });
      });

app.get("/participation", function(req, res){
        res.render("participation");
      });


app.get("/blog",function(req,res){
       res.render("blog")
      });


app.get("/contact",function(req,res){
  res.render("contact")
  });
  
app.get("/search",function(req,res){
  res.render("search")
  });

  app.post("/search", function(req, res){
    Headlines.findById({_id: "5f2ae5e0a8fdfb34783fde32" }, function(err, foundData){
      Headlines.findById({_id: "5f3a2218137d78019844cd84" }, function(err, foundData2){
      Headlines.findById({_id: "5f3a24bf8f57d0327c045241" }, function(err, foundData3){
      Headlines.findById({_id: "5f3a25d676aaef25c86ec91c" }, function(err, foundData4){
      Headlines.findById({_id: "5f3a2725b87f2627dcf157de" }, function(err, foundData5){
      res.render("search", {
        searchtopics : req.body.searchTopic,
        topics: foundData.topic,
        topics2: foundData2.topic2,
        topics3 : foundData3.topic3,
        topics4 : foundData4.topic4,
        topics5 : foundData5.topic5,
      });
    }) }) }) }) })
  });

app.post("/register", function(req, res){
    User.register({username:req.body.username}, req.body.password, function(err, user) {
    if (err) { 
      console.log(err);
      res.redirect("/register");
     } else{
       passport.authenticate("local")(req, res,function(){
        res.redirect("/admin");
       });
     }
  });
  });
  
app.post("/login", function(req, res){
      const user = new User({
      username: req.body.username,
      password: req.body.password
      });
  
      req.login(user, function(err){
        if(err){
          console.log(err);
        } else{
          passport.authenticate("local")(req, res,function(){
            res.redirect("/admin");
           });
        }
      })
    });

app.get('/logout', function(req, res){
      req.logout();
      res.redirect('/');
    });

app.get("/admin",function(req,res){
      if(req.isAuthenticated()){
        Aboutus.find({}, function(err, paragraphs){
        Headlines.findById({_id: "5f2ae5e0a8fdfb34783fde32" }, function(err, foundData){
        Headlines.findById({_id: "5f3a2218137d78019844cd84" }, function(err, foundData2){
        Headlines.findById({_id: "5f3a24bf8f57d0327c045241" }, function(err, foundData3){
        Headlines.findById({_id: "5f3a25d676aaef25c86ec91c" }, function(err, foundData4){
        Headlines.findById({_id: "5f3a2725b87f2627dcf157de" }, function(err, foundData5){
        res.render("admin", {
          topics : foundData.topic,
          topics2 : foundData2.topic2,
          topics3 : foundData3.topic3,
          topics4 : foundData4.topic4,
          topics5 : foundData5.topic5,
          paragraphs : paragraphs,
        });
      }) }) }) }) })
    })
      } else{
        res.redirect("/login");
      }
        });

app.post("/topic", function(req,res){
  Headlines.findByIdAndUpdate(
    { _id: "5f2ae5e0a8fdfb34783fde32" },
    { topic: req.body.headlinesTitle},
    function(err, result) {
      if (err) {
        res.send(err);
      } 
      else {
        res.redirect(req.get('referer'));
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
app.post("/topic2", function(req,res){
  Headlines.findByIdAndUpdate(
    { _id: "5f3a2218137d78019844cd84" },
    { topic2: req.body.headlinesTitle},
    function(err, result) {
      if (err) {
        res.send(err);
      } 
      else {
        res.redirect(req.get('referer'));
            }
    }
  );
    // const headlines= new Headlines ({
    //     topic2: req.body.headlinesTitle,
    //   });
    // headlines.save(function(err){
    //     if (!err){
    //       res.redirect("/");
    //     }
    //   });
});
app.post("/topic3", function(req,res){
  Headlines.findByIdAndUpdate(
    { _id: "5f3a24bf8f57d0327c045241" },
    { topic3: req.body.headlinesTitle},
    function(err, result) {
      if (err) {
        res.send(err);
      } 
      else {
        res.redirect(req.get('referer'));
            }
    }
  );
    // const headlines= new Headlines ({
    //     topic3: req.body.headlinesTitle,
    //   });
    // headlines.save(function(err){
    //     if (!err){
    //       res.redirect("/");
    //     }
    //   });
});
app.post("/topic4", function(req,res){
  Headlines.findByIdAndUpdate(
    { _id: "5f3a25d676aaef25c86ec91c" },
    { topic4: req.body.headlinesTitle},
    function(err, result) {
      if (err) {
        res.send(err);
      } 
      else {
        res.redirect(req.get('referer'));
            }
    }
  );
    // const headlines= new Headlines ({
    //     topic4: req.body.headlinesTitle,
    //   });
    // headlines.save(function(err){
    //     if (!err){
    //       res.redirect("/");
    //     }
    //   });
});
app.post("/topic5", function(req,res){
  Headlines.findByIdAndUpdate(
    { _id: "5f3a2725b87f2627dcf157de" },
    { topic5: req.body.headlinesTitle},
    function(err, result) {
      if (err) {
        res.send(err);
      } 
      else {
        res.redirect(req.get('referer'));
            }
    }
  );
    // const headlines= new Headlines ({
    //     topic5: req.body.headlinesTitle,
    //   });
    // headlines.save(function(err){
    //     if (!err){
    //       res.redirect("/");
    //     }
    //   });
});
app.post("/questions", function(req,res){
    const questions= new Questions ({
          qtopic : req.body.question,
          vote : req.body.vote
        });
      questions.save(function(err){
          if (!err){
            res.redirect(req.get('referer'));
          }
        });
  });

  app.post("/delete", function(req,res){
    const checkedparaId = req.body.checkbox;
     Aboutus.findByIdAndRemove(checkedparaId, function(err){
            if(!err){
                console.log("Successfully deleted checked item.");
                res.redirect(req.get('referer'));
            }
        })
  });

app.post("/aboutpara", function(req,res){
    const aboutus = new Aboutus ({
      paragraph : req.body.para,
        });
      aboutus.save(function(err){
          if (!err){
            res.redirect(req.get('referer'));
          }
        });
  });

app.listen(process.env.PORT || 443, function() {
  console.log("Server started on port 443");
});