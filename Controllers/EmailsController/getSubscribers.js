const emailModel = require('../../Models/email');

const emailResponse = require('../../EmailResponse/response.controller');

const loggerController = require('../Logger/logger.controller');

module.exports.getSubs = (res) => {
    emailModel.find()
    .sort({ createdAt: -1 })
        .then(emails => {
            console.log(emails);
            if (emails) {
                emailResponse.response('success',res,'Emails List',200,emails)
            }
            else {
                loggerController.insertEmailLogger({level:'ERROR',type:'SUBS',msg:'ERORR WHILE GETTING SUBS'});
                emailResponse.response('error',res,'Email Failed',500,null);
            }
        })
        .catch(err => {
            loggerController.insertEmailLogger({level:'ERROR',type:'SUBS',msg:'ERORR WHILE GETTING SUBS' + new Error(err)});
            emailResponse.response('error',res,err,500,null);

            console.log('err',err);
        })
}