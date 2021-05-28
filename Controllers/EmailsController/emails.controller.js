const getEmails = require('./getSubscribers');

const getCotnacts = require('./getContacts');

module.exports = {
    addEmail: (req,res,next) => {
        addEmail.addEmail(res,req.body.email);
    },

    getEmails: (req,res,next) => {
        getEmails.getSubs(res);
    },

    getContacts: (req,res,next) => {
        getCotnacts.getContacts(res);
    }
}