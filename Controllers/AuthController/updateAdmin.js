const admin = require('../../Models/admin');

const response = require('../../UserResponse/response.controller');
const Redis = require('ioredis');
const { RateLimiterRedis } = require('rate-limiter-flexible');

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

module.exports.updateAdmin = (res,adminId,query) => {
    rateLimiter.consume(req.connection.remoteAddress)
      .then((data) => {
        admin.findByIdAndUpdate(adminId,query,{$new:true}) 
        .then((newAdmin) => {
            console.log(newAdmin);
            if (newAdmin) {
                loggerController.insertLogger({level:'SUCCESS',type:'UPDATE',msg:'ADMIN UPDATED SUCCESSFULLY'});
                response.response('success',res,'Admin Updated Successfully',200,newAdmin );
            }
            else {
                loggerController.insertLogger({level:'WARNING',type:'UPDATE',msg:'ADMIN NOT FOUND'});
                response.response('error',res,'Admin Not Found',404,null);
            }
        })
        .catch(err => {
            loggerController.insertLogger({level:'ERROR',type:'UPDATE',msg:'Something Went Wrong !' + new Error(err)});
            response.response('error',res,'Something Went Wrong !',500,null);
        })
      })
      .catch((rejRes) => {
        // Blocked
        const secBeforeNext = Math.ceil(rejRes.msBeforeNext / 1000) || 1;
        loggerController.insertLogger({level:'ERROR',type:'UPDATE',msg:'To Many Login Attempts'});
        res.set('Retry-After', String(secBeforeNext));
        res.status(429).send('Too Many Requests');
      })
    
}