//boilerplate code at this point. should work....not loading my config file until I properly hide my local password in a keys/env scheme
//have to go back to my handlebars hw for that
//https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions
var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public", {
  index: false, 
  immutable: true, 
  cacheControl: true,
  maxAge: "30d"
}));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
