const errResponse = require('./response.err.product');
const successResponse = require('./response.success.product');

module.exports.response = (type,res,msg,status,products,endPoint,err) => {
    if (type == 'error'){
        return errResponse.error(res,msg,status,null,endPoint,err);
    }
    else if (type == 'success'){
        return successResponse.success(res,msg,status,products,endPoint);
    }
}