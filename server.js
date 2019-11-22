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
const bodyparser=require("body-parser")
const cookieParser = require('cookie-parser')
const db = require("./models");

app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.use(express.static("public"));
app.use(cookieParser())

app.set('trust proxy', 1) 
app.use(session({
  secret: 'testkey123',
  resave: true,
  saveUninitialized: true,
  
}))

app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
// require("./config/passport.js")(passport);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
