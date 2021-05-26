
const jwt = require('../../Middlewares/jwt/jwt');
const response = require('../../UserResponse/response.controller');
var  passport = require("passport");
const admin = require("../../Models/admin");

module.exports = {
    login: (req, res, next) => {
        passport.authenticate('local',{session: false}, (err, admin, info) => {
            console.log(admin,info);
            if (!admin) {
                response.response("error", res, info, 401,null);
                next();
            }
            else {
                req.login(admin, (err) => { 
                    if (err) {
                        console.log('err',err)
                        response.response("error", res, err, 401,null);
                    }
                    
                    const token = jwt.getToken({ _id: admin._id });
                    response.response("success", res, token, 200,admin);
                })
            }
                
            })(req, res, next)
    }
}