const contactModel = require('../../Models/contact');

const emailResponse = require('../../EmailResponse/response.controller');

module.exports.getContacts = (res) => {
    contactModel.find()
    .sort({ createdAt: -1 })
        .then(contacts => {
            console.log(contacts);
            if (contacts) {
                emailResponse.response('success',res,'Contacts List',200,contacts)
            }
            else {
                emailResponse.response('error',res,'Contact Failed',500,null);
            }
        })
        .catch(err => {
            emailResponse.response('error',res,err,500,null);

            console.log('err',err);
        })
}