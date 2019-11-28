//boilerplate code at this point. should work....not loading my config file until I properly hide my local password in a keys/env scheme
//have to go back to my handlebars hw for that
//https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
require("./config/passport");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyparser=require("body-parser");
const cookieParser = require('cookie-parser')
const db = require("./models");


app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.use(express.static("public"));

// for security this needs to be set
// https://stackoverflow.com/questions/23413401/what-does-trust-proxy-actually-do-in-express-js-and-do-i-need-to-use-it
app.set('trust proxy', 1) 
app.use(cookieParser())
app.use(session({
  secret: process.env.LOCAL_SECRET_COOKIE,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge : 7200000 } 
  
}))

// app.use(express.cookieParser("Secret123"));
// app.use(express.session({   store: sessionStore,
//                         cookie: { maxAge : 3600000 } //1 Hour
//                         }));


app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/socket");
// require("./config/passport.js")(passport);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
