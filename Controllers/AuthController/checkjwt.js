const passport = require("passport");

module.exports = {
    checkJWT: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, hash, info) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if (!hash) {
                error(res, "TOKEN INVALID", 401, null)
            } else {
                success(res, "TOKEN VALID", 200, hash)
            }
        })(req, res, next)
    }
}


function success(res, token, status, admin) {
    admin = admin.toObject();
    delete admin.hash;
    delete admin.salt;
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    res.json({ msg: "Welcom to Chocho Pet ", success: true, token: token, status: status, user: admin });
}

function error(res, err, status, admin) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    res.json({ msg: "Something Went Wrong !", success: false, err: err, status: status, user: admin });
}
