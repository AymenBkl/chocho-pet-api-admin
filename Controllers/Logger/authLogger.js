const authLogger = require('../../Models/auth-logger');

module.exports.insertAuthLogger = (object) => {
    authLogger.create(object)
        .then((result) => {
        })
        .catch(err => {
        })
}

module.exports.getAuthLogger = (res,level) => {
    authLogger.find({level:level})
        .then((loggers) => {
            if (loggers && loggers.length > 0){
                res.json({status:200,success:true,object:loggers});
            }
            else if (loggers && loggers.length == 0){
                res.json({status:404,success:true,object:loggers});
            }
            else {
                res.json({status:500,success:false,err:'Somthing Went Wrong !'});
            }
        })
        .catch(err => {
            res.json({status:500,success:false,err:err});
        })
}

