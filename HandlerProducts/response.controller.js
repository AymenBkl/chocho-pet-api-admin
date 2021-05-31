const errResponse = require('./response.err.product');
const successResponse = require('./response.success.product');

module.exports.response = (type,res,msg,status,products,err) => {
    if (type == 'error'){
        return errResponse.error(res,status,err);
    }
    else if (type == 'success'){
        return successResponse.success(res,msg,status,products);
    }
}