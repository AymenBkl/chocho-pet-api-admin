const errResponse = require('./response.err.bitcoin');
const successResponse = require('./response.success.bitcoin');

module.exports.response = (type,res,msg,status,body,url) => {
    if (type == 'error'){
        return errResponse.error(res,msg,status,body,url);
    }
    else if (type == 'success'){
        return successResponse.success(res,msg,status,body,url);
    }
}