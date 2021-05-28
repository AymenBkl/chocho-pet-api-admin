const getEmails = require('./getSubscribers');

const getCotnacts = require('./getContacts');

const sendEmail = require('./sendEmail');
module.exports = {
    addEmail: (req,res,next) => {
        addEmail.addEmail(res,req.body.email);
    },

    getEmails: (req,res,next) => {
        getEmails.getSubs(res);
    },

    getContacts: (req,res,next) => {
        getCotnacts.getContacts(res);
    },
    sendEmail: (req,res,next) => {
        sendEmail.sendEmail('aymenxyz6@gmail.com','WELCOM TO CHOCHO PET','COUPON');
    }
}