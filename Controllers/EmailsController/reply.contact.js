const sendEmailNodeMailer = require('../../Middlewares/nodemailer');

const contactModel = require('../../Models/contact');

const emailResponse = require('../../EmailResponse/response.controller');

module.exports.sendContactEmail = async (res,req) => {
    let result = await sendEmail(req.body.email,'REPLY',req.body.subject,req.body.message,req.body.contactId);
    if (result && result != false) {
        emailResponse.response('success',res,'Email Sent Successfully',200);
    }
    else {
        emailResponse.response('error',res,'Something Went Wrong',500);
    }
}
async function updateContactReplied(id) {
    return new Promise(async (resolve) => {
        contactModel.findByIdAndUpdate(id,{$set : {
            replied:true
        }},{$new:true})
        .then(contactUpdated => {
            console.log('here',contactUpdated)
            if (contactUpdated) {
                resolve({status:true,msg:'message sent'});
            }
            else {
                resolve({status:false,msg:'couldnt send message'});
            }
        })
        .catch((err) => {
            console.log(err);
            resolve({status:false,msg:'couldnt send message'});
        })
    })
    
}
async function sendEmail(email,title,subject,content,emailId) {
    return new Promise((resolve,reject) => {
        console.log(content);
        setTimeout(async () => {
            
            sendEmailNodeMailer.sendEmailContact(email,title,subject,content)
            .then(async (result) => {
                if (result && result.status) {
                        resolve(await updateContactReplied(emailId));
                }
                else {
                    resolve({status:false,msg:"message not send"});
                }
            })
            .catch((err) => {
                resolve({status:false,msg:"message not send"});
    
            })
        },5000);
        })
}