const admin = require('../../Models/admin');

const response = require('../../UserResponse/response.controller');


module.exports.updateAdmin = (res,adminId,query) => {
    admin.findByIdAndUpdate(adminId,query,{$new:true}) 
        .then((newAdmin) => {
            console.log(newAdmin);
            if (newAdmin) {
                response.response('success',res,'Admin Updated Successfully',200,newAdmin );
            }
            else {
                response.response('error',res,'Admin Not Found',404,null);
            }
        })
        .catch(err => {
            response.response('error',res,'Something Went Wrong !',500,null);
        })
}