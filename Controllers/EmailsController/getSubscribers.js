const emailModel = require('../../Models/email');

const emailResponse = require('../../EmailResponse/response.controller');

module.exports.getSubs = (res) => {
    emailModel.find()
        .then(emails => {
            console.log(emails);
            if (emails) {
                emailResponse.response('success',res,'Emails List',200,emails)
            }
            else {
                emailResponse.response('error',res,'Email Failed',500,null);
            }
        })
        .catch(err => {
            emailResponse.response('error',res,err,500,null);

            console.log('err',err);
        })
}