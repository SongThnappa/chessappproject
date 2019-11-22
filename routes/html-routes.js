
const path = require("path");
const restrict = require("./../config/middleware/isAuthenticated");
// app.get('/route-with-restricted-access', restrict, function(res, res, next) {
//   // Handle request...
// });
// https://www.google.com/search?client=firefox-b-1-d&q=hows+does+passport+local+work
// http://toon.io/on-passportjs-specific-use-cases/
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/Login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  // app.get("/WaitingRoom", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/login.html"));
  // });


  // app.get("/login/incorrect_password", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/incorrect.html"));
  // });

  app.get("/waitingroom/success", restrict, function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/waitRoom.html"));
  });

  app.get("/Chat", restrict, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/chatRoom.html"));
  });



};
