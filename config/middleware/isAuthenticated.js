const passport = require("passport");

// http://toon.io/understanding-passportjs-authentication-flow/
// http://toon.io/on-passportjs-specific-use-cases/

// module.exports = function(req, res, next){

//     if(req.user){
//         return next();
//     }
//     return res.redorect("/waitingroom/failed")
// }
module.exports = function restrict(req, res, next) {
    if (req.isAuthenticated()) {
        // console.log(req.user)
        next();
    } else {
        return res.status(403).json({
            message: 'Access denied, please log in'
        })
    };


}