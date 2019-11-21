var db = require("../models");
var bcrypt=require("bcrypt");


module.exports = function (app) {

  app.post("/register", function (req, res) {
    console.log(req.body);
    var registrationPassword = req.body.password;
    db.Login.create({
        userName: req.body.username,
        firstName: req.body.first,
        lastName: req.body.last,
        password: registrationPassword,

      })
      .then(function (dbLogin) {
        console.log("new user created");
        res.status(201).end();
      });

  });

  app.post("/login", function (req, res) {
    var loginUser = req.body.loginName;
    var loginPassword = req.body.loginPassword;
    console.log("TCL: loginPassword", loginPassword)

    db.Login.findAll({
        where: {
          userName: loginUser.toLowerCase().trim(),
        }

      })
      .then (async dbLogin => { 
        if(!dbLogin){
          res.redirect("/login")
 
        }
        await bcrypt.compare(loginPassword, dbLogin[0].dataValues.password, function (err, isMatch){

          if (err){
            throw err
          }
          if(!isMatch){
            console.log("mismatched")
            return res.redirect("/login/incorrect_password")
          }
          return  res.redirect("/waitingroom/" + dbLogin[0].dataValues.userID.slice(15));
        })

          
        
    
          // res.session.dbLogin=dbLogin.dataValues;
         
        
        // console.log("user found in database");
        // console.log(user[0].dataValues.userID);
        // console.log(loginPassword);
        // if (loginPassword === user[0].dataValues.password) {
        //   console.log("password match");
        //   res.status(200).redirect("/waitingRoom/" + loginUser);
        
        // } else {
        //   res.redirect("/login");
        // }

      });

  });


}