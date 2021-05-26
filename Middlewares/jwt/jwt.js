const passport = require("passport");

const passportJwtStrategy = require("passport-jwt").Strategy;

const extractJwt = require("passport-jwt").ExtractJwt;

const JWT = require("jsonwebtoken");

const adminModel = require("../../Models/admin"); 

const config = require("../../config").config;


module.exports.getToken = (admin) => {
  return JWT.sign(admin, config.token.secretKey, {
    expiresIn: config.token.tokenExperationDate,
  });
};

var opts = {};

opts.secretOrKey = config.token.secretKey;
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();

exports.jwtPassport = passport.use(
  new passportJwtStrategy(opts, (jwt_payload, done) => {
    adminModel.findOne({ _id: jwt_payload._id }, (err, admin) => {
      if (err) {
        return done(err, false);
      } else if (admin) {
        return done(null, admin);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.role == 'admin') {
      next();
    } else {
      res.statusCode = 403;
      res.json({status : 403,msg : 'you are not allow to do this operation'});
    }
  } else {
    res.statusCode = 403;
    res.json({status : 403,msg : 'login first'});
  }
};


var localStrategy = require("passport-local").Strategy;

exports.localStrategy = passport.use(new localStrategy(adminModel.authenticate()));
passport.serializeUser(adminModel.serializeUser());
passport.deserializeUser(adminModel.deserializeUser());


