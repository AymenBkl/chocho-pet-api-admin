
const checkJWT = require('./checkjwt');

const changePassword = require('./changePassword');

const login = require('./login');

const register = require('./register');

const user = require('../../Models/admin');

const updateAdmin = require('./updateAdmin');

const uploadImage = require('./uploadImage');

module.exports = {
    checkJWT : (req,res,next) => {
        checkJWT.checkJWT(req,res,next)
    },

    changePassword : (req,res,next) => {
        changePassword.changePassword(req,res,next);
    },

    login : (req,res,next) => {
        login.login(req,res,next);
    },

    register : (req,res,next) => {
        const newUser = new user({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            username: req.body.username,
            city: req.body.city,
            country:req.body.country,
            address:req.body.address,
            postalCode:req.body.postalCode,
            description:req.body.description,
            role : req.body.role
        })
        register.registerUser(req,res,newUser,req.body.password); 
    },

    updateAdmin: (req,res,next) => {
        console.log('here');
        const query = {
            $set : req.body.updatedAdmin
        }
        updateAdmin.updateAdmin(res,req.body.adminId,query);
    },

    uploadImage: (req,res,next) => {
        uploadImage.upload(req,res);
    }

}