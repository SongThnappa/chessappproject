const db = require("../models");
const passport = require("passport");
require("./../config/passport");
require("./../config/middleware/isAuthenticated.js");
// require("./../config/passport")(passport);


module.exports = function (app) {

  app.post("/register", function (req, res) {
    const { username, first, last, password} = req.body; 


    db.Login.create({
        email: username,
        firstName: first,
        lastName: last,
        password: password,

      })
      .then(function (dbLogin) {
        console.log("new user created");
        res.status(201).end();
      });

  });

  app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res, next) {
    res.redirect("/waitingroom/success");
  });





  app.get("/logout", function(req, res){
    console.log("logout press")
    req.logout();
  
    res.redirect('/'); 
  });

} 