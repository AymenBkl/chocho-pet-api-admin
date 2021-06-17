
const jwt = require('../../Middlewares/jwt/jwt');
const response = require('../../UserResponse/response.controller');
var  passport = require("passport");
const admin = require("../../Models/admin");
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
module.exports = {
    login: (req, res, next) => {
        rateLimiter.consume(req.connection.remoteAddress)
            .then(data => {
                console.log(data.remainingPoints);
                passport.authenticate('local',{session: false}, (err, admin, info) => {
                    if (!admin) {
                        response.response("error", res, info, 401,null);
                        loggerController.insertLogger({level:'WARNING',type:'LOGIN',msg:'Unauthorized, Wrong Password Or Email'});
                        next();
                    }
                    else {
                        req.login(admin, (err) => { 
                            if (err) {
                                console.log('err',err)
                                loggerController.insertLogger({level:'WARNING',type:'LOGIN',msg:'Unauthorized, Wrong Password Or Email' + new Error(err)});
                                response.response("error", res, err, 401,null);
                            }
                            
                            const token = jwt.getToken({ _id: admin._id });
                            loggerController.insertLogger({level:'SUCCESS',type:'LOGIN',msg:'Login Successfull'});
                            response.response("success", res, token, 200,admin);
                        })
                    }
                        
                    })(req, res, next)
        })
        .catch((rejRes) => {
            // Blocked
            const secBeforeNext = Math.ceil(rejRes.msBeforeNext / 1000) || 1;
            loggerController.insertLogger({level:'ERROR',type:'LOGIN',msg:'To Many Login Attempts'});
            res.set('Retry-After', String(secBeforeNext));
            res.status(429).send('Too Many Requests');
          })
        
    }
}