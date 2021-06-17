const authLogger = require('./authLogger');

const productLogger = require('./productLogger');

module.exports = {
    getAuthLogger : (req,res,next) => {
        authLogger.getAuthLogger(res,req.query.level);
    },

    insertLogger : (object) => {
        authLogger.insertAuthLogger(object);
    },

    getProductLogger : (req,res,next) => {
        productLogger.getProductLogger(res,req.query.level);
    },

    insertProductLogger : (object) => {
        productLogger.insertProductLogger(object);
    }
}