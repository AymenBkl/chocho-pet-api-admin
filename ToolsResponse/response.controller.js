const errResponse = require('./response.err.tools');
const successResponse = require('./response.success.tools');

module.exports.response = (type,res,msg,status,object) => {
    if (type == 'error'){
        return errResponse.error(res,status,object,msg);
    }
    else if (type == 'success'){
        return successResponse.success(res,msg,status,object);
    }
}