const errResponse = require('./response.err.game');
const successResponse = require('./response.success.game');

module.exports.response = (type,res,msg,status,response) => {
    if (type == 'error'){
        return errResponse.error(res,msg,status,response);
    }
    else if (type == 'success'){
        return successResponse.success(res,msg,status,response);
    }
}