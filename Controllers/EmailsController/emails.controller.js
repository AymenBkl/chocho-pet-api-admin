const getEmails = require('./getSubscribers');

const getCotnacts = require('./getContacts');

const sendEmail = require('./sendEmail');

const replyContact = require('./reply.contact');
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
        sendEmail.sendEmail(req.body.emails,res);
    },

    replyContact: (req,res,next) => {
        replyContact.sendContactEmail(res,req);
    }
}