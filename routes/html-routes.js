const path = require("path");
const restrict = require("./../config/middleware/isAuthenticated");
// app.get('/route-with-restricted-access', restrict, function(res, res, next) {
//   // Handle request...
// });
// http://toon.io/understanding-passportjs-authentication-flow/
// http://toon.io/on-passportjs-specific-use-cases/
module.exports = function (app) {

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));

  });

  app.get("/Login", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  // app.get("/WaitingRoom", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/login.html"));
  // });


  // app.get("/login/incorrect_password", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/incorrect.html"));
  // });

  app.get("/waitingroom/success", restrict, function (req, res, next) {
    res.sendFile(path.join(__dirname, "../public/waitRoom.html"));

  });

  app.get("/game/:gameID", restrict, function (req, res) {
    console.log("game redirect")
    res.sendFile(path.join(__dirname, "../public/gameroom.html"));
  });



};