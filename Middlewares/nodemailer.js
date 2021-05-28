const nodemailer = require('nodemailer');


const { config } = require('../config');

var fs = require('fs');

const handlebars = require('handlebars');

const templateBuilder = require('nodemailer-express-handlebars');

var source = fs.readFileSync('views/layout/email-template.handlebars', 'utf8');

var template = handlebars.compile(source);

var transport;
module.exports.createTransporter = () => {
    transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:config.email.email,
            pass:config.email.psw
        }
    });
    transport.use('compile', templateBuilder({
        viewEngine : 'express-handlebars',
        viewPath : './views/layout'
    }))
}

module.exports.sendEmail = (sendTo,coupon,title,subject) => {
    return new Promise((resolve,reject) => {
        let mailOptions = {
            from:config.email.email,
            to:sendTo,
            subject:subject,
            html : template({coupon : coupon,title:title})
        };
    
        transport.sendMail(mailOptions,(error,info) => {
            if (error) {
                resolve({status:false})
                console.log(error);
            }
            else {
                resolve({status:true})
                console.log('email sent');
            }
        })
    })
   
}