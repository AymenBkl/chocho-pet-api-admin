const contactModel = require('../../Models/contact');

const emailResponse = require('../../EmailResponse/response.controller');
const loggerController = require('../Logger/logger.controller');

module.exports.getContacts = (res) => {
    contactModel.find()
    .sort({ createdAt: -1 })
        .then(contacts => {
            console.log(contacts);
            if (contacts) {
                emailResponse.response('success',res,'Contacts List',200,contacts)
            }
            else {
                loggerController.insertEmailLogger({level:'ERROR',type:'CONTACT',msg:'ERORR WHILE GETTING CONTACTS'});
                emailResponse.response('error',res,'Contact Failed',500,null);
            }
        })
        .catch(err => {
            loggerController.insertEmailLogger({level:'ERROR',type:'CONTACT',msg:'ERORR WHILE GETTING CONTACTS' + new Error(err)});
            emailResponse.response('error',res,err,500,null);

            console.log('err',err);
        })
}