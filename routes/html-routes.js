
var path = require("path");

module.exports = function(app) {

 
  app.get("/Login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  app.get("/login/incorrect_password", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/incorrect.html"));
  });

  app.get("/WaitingRoom/:loginuser", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/waitRoom.html"));
  });

  app.get("/WaitingRoom", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/Chat", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/chatRoom.html"));
  });



};
