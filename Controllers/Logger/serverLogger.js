const serverLogger = require('../../Models/serverLogger');

module.exports.insertServerLogger = (object) => {
    serverLogger.create(object)
        .then((result) => {
        })
        .catch(err => {
        })
}

module.exports.getServerLogger = (res,level) => {
    serverLogger.find({level:level})
    .sort({ createdAt: -1 })
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

