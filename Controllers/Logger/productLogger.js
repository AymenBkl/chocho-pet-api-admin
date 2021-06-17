const productLogger = require('../../Models/productLogger');

module.exports.insertProductLogger = (object) => {
    productLogger.create(object)
        .then((result) => {
        })
        .catch(err => {
        })
}

module.exports.getProductLogger = (res,level) => {
    console.log(level);
    productLogger.find({level:level})
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

