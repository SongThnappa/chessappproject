var db = require("../models");


module.exports = function (app) {

  app.post("/register", function (req, res) {
    console.log(req.body);
    db.Login.create({
        userName: req.body.username,
        firstName: req.body.first,
        lastName: req.body.last,
        password: req.body.password,

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
      .then(dbLogin => {
        console.log("user found in database");
        console.log(dbLogin[0].dataValues.password);
        console.log(loginPassword);
        if (loginPassword === dbLogin[0].dataValues.password) {
          console.log("password match");
          res.status(200).redirect("/waitingRoom/" + loginUser);
        
        } else {
          res.redirect("/login");
        }

      });

  });


}