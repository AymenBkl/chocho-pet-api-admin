const user = require("../../Models/admin");
const response = require('../../UserResponse/response.controller');
const jwt = require('../../Middlewares/jwt/jwt');
const passport = require("passport");
module.exports = {
    registerUser : (req,res,newUser,password) => {
        console.log("here");
        user.register(newUser,password,(err,user) => {
            if (err){
                console.log(err);
                response.response('error',res,err,500)
            }
            else {
                console.log(user);
                passport.authenticate("local")(req,res,() => {
                   response.response('success',res,jwt.getToken({_id:user._id}),200);
                })
            }
        })     
}
}

