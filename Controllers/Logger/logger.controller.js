const authLogger = require('./authLogger');

module.exports = {
    getAuthLogger : (req,res,next) => {
        authLogger.getAuthLogger(res);
    },

    insertLogger : (object) => {
        authLogger.insertAuthLogger(object);
    }
}