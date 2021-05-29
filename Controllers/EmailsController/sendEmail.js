
const sendEmailNodeMailer = require('../../Middlewares/nodemailer');

const emailModel = require('../../Models/email');

const generateCoupon = require('../../Functions/Shopify/priceRules').createDiscount;

let emails = [];
module.exports.sendEmail = async (email) => {
    return new Promise(async (resolve,reject) => {
        emails = email;
        emailsLoop();
    });
    
}

async function emailsLoop() {
    while (emails.length > 0 ){
        console.log(emails.length);
        await generateCoupon() 
            .then(async (couponResult) => {
                console.log(couponResult.status == true && couponResult.body != null);
                if (couponResult.status == true && couponResult.body != null){
                    await sendEmail(couponResult.body.discount_code.code,emails[0],'WELCOM TO CHOCHO PET','COUPON');
                    emails.shift();
                }
                else {
                    emails.shift();
                }
            }) 
            .catch(err => {
                emails.shift();
            })
    }
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
        console.log('here');
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