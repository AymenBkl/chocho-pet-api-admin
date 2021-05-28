const errResponse = require('./response.err.email');
const successResponse = require('./response.success.email');

module.exports.response = (type,res,msg,status,object) => {
    if (type == 'error'){
        return errResponse.error(res,status,object,msg);
    }
    else if (type == 'success'){
        return successResponse.success(res,msg,status,object);
    }
}