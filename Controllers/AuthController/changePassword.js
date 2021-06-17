const AdminModel = require('../../Models/admin');
const response = require('../../UserResponse/response.controller');
const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');

const loggerController = require('../Logger/logger.controller');

const redisClient = new Redis({
  options: {
    enableOfflineQueue: false,
    
  }
});

redisClient.set("foo", "bar");

const opts = {
  redis: redisClient,
  points: 5, // 5 points
  duration: 15 * 60, // Per 15 minutes
  blockDuration: 15 * 60, // block for 15 minutes if more than points consumed 
};

const rateLimiter = new RateLimiterRedis(opts);
module.exports.changePassword = (req,res,next) => {
    rateLimiter.consume(req.connection.remoteAddress)
        .then((data) => {
            console.log(data.remainingPoints);
            console.log(req.user.username,req.body.oldPassword);
            AdminModel.findByUsername(req.user.username)
                .then((sanitizedAdmin) => {
                console.log(sanitizedAdmin);
                if (sanitizedAdmin){
                    sanitizedAdmin.changePassword(req.body.oldPassword,req.body.newPassword)
                        .then(updateAdmin =>{
                        AdminModel.updateOne({AdminId:req.body.AdminId},updateAdmin)
                            .then((Admin) => {
                                if (Admin){
                                    loggerController.insertLogger({level:'SUCCESS',type:'CHANGE PASSWORD',msg:'PASSWORD CHANGED SUCCESSFULLY'});
                                    response.response("success", res, "YOUR PASSWORD HAS BEEN Changed", 200,Admin);
                                }
                                else {
                                    loggerController.insertLogger({level:'ERROR',type:'CHANGE PASSWORD',msg:'Something Went Wrong !'});
                                    response.response("error", res, err, 404,null);
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                                loggerController.insertLogger({level:'ERROR',type:'CHANGE PASSWORD',msg:'Something Went Wrong !' + new Error(err)});
                                response.response("error", res, err, 500,null);
                            });
                    })
                    .catch(err => {
                        console.log(err)
                        loggerController.insertLogger({level:'ERROR',type:'CHANGE PASSWORD',msg:'Something Went Wrong !' + new Error(err)});
                        response.response("error", res, err, 500,null);
                    });
                } else {
                    loggerController.insertLogger({level:'WARNING',type:'CHANGE PASSWORD',msg:'Admin DOSN"T EXIST !'});
                    response.response("error", res, "Admin DOSN'T EXIST", 404,null);
                }
            },(err) => {
                console.log(err)
                loggerController.insertLogger({level:'ERROR',type:'CHANGE PASSWORD',msg:'Something Went Wrong !' + new Error(err)});
                response.response("error", res, err, 500,null);
            })
            .catch(err => {
                console.log(err)
                loggerController.insertLogger({level:'ERROR',type:'CHANGE PASSWORD',msg:'Something Went Wrong !' + new Error(err)});
                response.response("error", res, err, 500,null);
            })
        })
        .catch((rejRes) => {
            // Blocked
            const secBeforeNext = Math.ceil(rejRes.msBeforeNext / 1000) || 1;
            loggerController.insertLogger({level:'ERROR',type:'LOGIN',msg:'To Many Login Attempts'});
            res.set('Retry-After', String(secBeforeNext));
            res.status(429).send('Too Many Requests');
          })
    
}