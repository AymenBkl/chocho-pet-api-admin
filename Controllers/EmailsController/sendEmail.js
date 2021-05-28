
const sendEmailNodeMailer = require('../../Middlewares/nodemailer');

const emailModel = require('../../Models/email');
module.exports.sendEmail = async (email,title,subject) => {
    /**return new Promise(async (resolve,reject) => {
        notificationModel.findOne({link:link,email:email,itemId:itemId})
        .then(async (notification) => {
            if (notification && notification != null){
                resolve({status:false,msg:'item exist'});
            }
            else {
                sendEmail(link,price,url,itemId,email,title)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch(err => {
                        resolve({status:false,msg:'couldnt send message'})
                    })
            }
        })
        .catch(err => {
            resolve({status:false,msg:'couldnt send message'});
        })
    })**/
    return new Promise(async (resolve,reject) => {
        resolve(sendEmail('LLLLL',email,title,subject));
    });
    
}

async function createNotification(link,itemId,email) {
    return new Promise(async (resolve,reject) => {
        notificationModel.create({link:link,itemId:itemId,email:email})
            .then((notificationCreated) => {
                if (notificationCreated) {
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

async function updateEmailCouponSent(email) {
    return new Promise(async (resolve) => {
        emailModel.findOneAndUpdate({email:email},{$set : {
            sentCoupon:true
        }},{$new:true})
        .then(emailUpdated => {
            if (emailUpdated) {
                resolve({status:true,msg:'message sent'});
            }
            else {
                resolve({status:false,msg:'couldnt send message'});
            }
        })
        .catch((err) => {
            resolve({status:false,msg:'couldnt send message'});
        })
    })
    
}

async function sendEmail(coupon,email,title,subject) {
    return new Promise((resolve,reject) => {
        setTimeout(async () => {
            sendEmailNodeMailer.sendEmail(email,coupon,title,subject)
            .then(async (result) => {
                if (result && result.status) {
                        resolve(await updateEmailCouponSent(email));
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