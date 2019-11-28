const db = require("../models");
const passport = require("passport");
require("./../config/passport");
require("./../config/middleware/isAuthenticated.js");
// require("./../config/passport")(passport);


module.exports = function (app) {

  app.post("/register", function (req, res) {
    const {
      email2,
      first,
      last,
      password
    } = req.body;

    db.Login.findOne({
      where: {
        email: email2
      }
    }).then((user) => {
      if (user) {
        console.log("user exists")
        return
      } else {
        db.Login.create({
            email: email2,
            firstName: first,
            lastName: last,
            password: password,

          })
          .then(function (dbLogin) {

          })
        console.log("new user created");
        res.status(201).end();
      }
    });

  });

  app.post('/login',
    passport.authenticate('local', {
      failureRedirect: '/login'
    }),
    function (req, res, next) {
      db.Login.update({
          loginStatus: "signedON"
        }, {
          where: {
            email: req.body.email
          }
        })
        .then(function (rowsUpdated) {
          res.redirect("/waitingroom/success")
        })
        .catch(next)

    });





  app.get("/logout", function (req, res) {
    // would need to include the username on the logout button to change login status... leaving it like it is for now.

    req.logout();
    res.redirect('/');


  });

  app.post("/newgame", function (req, res, err) {

    const {
      gameID,
      email
    } = req.body;
    console.log(gameID);


    db.Tables.findOne({
      where: {
        gameID: gameID,
      }
    }).then((game) => {
      if (game) {
        console.log("game exists")
        return res.end()
      } else {
        db.Tables.create({
            gameID: gameID,
            Player1: email


          })
          .then(function (dbTables) {
            console.log(`new game created ID : ${gameID}`);
            res.send("/game/" + gameID);
            //first time using back ticks


          })







      }



    })


  })
}