const authLogger = require('./authLogger');

const productLogger = require('./productLogger');

const emailLogger = require('./emailLogger');

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
    },
    getEmailLogger : (req,res,next) => {
        emailLogger.getEmailLogger(res,req.query.level);
    },

    insertEmailLogger : (object) => {
        emailLogger.insertEmailLogger(object);
    }
}