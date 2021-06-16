const authLogger = require('../../Models/auth-logger');

module.exports.insertAuthLogger = (object) => {
    authLogger.create()
        .then((result) => {

        })
        .catch(err => {

        })
}

module.exports.getAuthLogger = (res) => {
    authLogger.find({})
        .then((loggers) => {
            if (loggers && loggers.length > 0){
                res.json({status:200,success:true,object:loggers});
            }
            else if (loggers && loggers.length == 0){
                res.json({status:404,success:true,object:loggers});
            }
            else {
                res.json({status:500,success:true,err:'Somthing Went Wrong !'});
            }
        })
        .catch(err => {
            res.json({status:500,success:true,err:err});
        })
}

