const errResponse = require('./response.err.hash');
const successResponse = require('./response.success.hash');

module.exports.response = (type,res,msg,status,hash) => {
    if (type == 'error'){
        return errResponse.error(res,msg,status,hash);
    }
    else if (type == 'success'){
        return successResponse.success(res,msg,status,hash);
    }
}