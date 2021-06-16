const authLogger = require('./authLogger');

module.exports = {
    getAuthLogger : (req,res,next) => {
        authLogger.getAuthLogger(res,req.query.level);
    },

    insertLogger : (object) => {
        authLogger.insertAuthLogger(object);
    }
}