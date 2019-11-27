const passport = require("passport");
const LocalStrategy = require('passport-local')
const bcrypt = require("bcrypt");
const db = require("../models");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  db.Login.findOne({
    where: {
      id: id
    }
  }).then(function (user) {
    done(null, user);
    // console.log("+++++++++++++++++++++++++++++++++++++++");
    // console.log(user);
    // console.log("+++++++++++++++++++++++++++++++++++++++")
  }).catch(done);
});




passport.use(new LocalStrategy({
    usernameField: "email"
  },
  function (email, password, done) {
    db.Login.findOne({
        where: {
          email: email
        }
      }).then(function (user) {

        if (!user) {
          console.log("user does not exist")
          return done(null, false)
        }
        // console.log(password);
        // console.log(user.password);
        bcrypt.compare(password, user.password, function (err, isMatch) {
          if (err) throw err;

          if (isMatch) {
            console.log("password matched")
            return done(null, user)
          } else {
            console.log("password did not matched")
            return done(null, false)
          }
        })

      })
      .catch(err => console.log(err))




  }))





module.exports = passport;