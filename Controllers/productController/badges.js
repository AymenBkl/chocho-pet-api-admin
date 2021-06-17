const badgeModel = require('../../Models/badge');

const loggerController = require('../Logger/logger.controller');

const mongoose = require('mongoose');
module.exports.saveBadge = (badgeBody,res) => {
    let badgeId = badgeBody._id;
    if (!badgeId || badgeId == ''){
        console.log('here');
        badgeId = new mongoose.Types.ObjectId();
    }
    delete badgeBody._id;
    delete badgeBody.createdAt;
    badgeModel.findByIdAndUpdate(badgeId,badgeBody,{new:true,upsert:true})
        .then((badgeUpdated) => {
            if (badgeUpdated) {
                loggerController.insertProductLogger({level:'SUCCESS',type:'BADGES',msg:'BADGE UPDATED SUCCESSFULLY'});
                res.json({msg:'BADGES UPDATED SUCCESSFULY',status:200,badge:badgeUpdated,success:true});
            }
            else {
                res.json({msg:'ERROR SAVING BADGE',status:500,success:false});
                loggerController.insertProductLogger({level:'ERROR',type:'BADGES',msg:'ERROR UPDATING BADGE'});
            }
        })
        .catch(err => {
            loggerController.insertProductLogger({level:'ERROR',type:'BADGES',msg:'ERROR UPDATING BADGE' + new Error(err)});
            if (err && err.code == 11000){
                res.json({msg:'Name Already Exists',status:500,success:false});
            }
            else {
                res.json({msg:'ERROR SAVING BADGE',status:500,success:false});
            }
        })
}


module.exports.getBadges = (res) => {
    badgeModel.find()
        .then((badges) => {
            if (badges && badges.length > 0){
                res.json({msg:'BADGES',status:200,badges:badges,success:true});
            }
            else if (badges && badges.length == 0){
                loggerController.insertProductLogger({level:'WARNING',type:'BADGES',msg:'NO BADGES FOUND'});
                res.json({msg:'You dont"t have any badges',status:404,badges:null,success:false});
            }
            else {
                loggerController.insertProductLogger({level:'ERROR',type:'BADGES',msg:'ERROR UPDATING BADGE'});
                res.json({msg:'ERROR SAVING BADGE',status:500,success:false});
            }
        })
        .catch(err => {
            loggerController.insertProductLogger({level:'ERROR',type:'BADGES',msg:'ERROR UPDATING BADGE' + new Error(err)});
            res.json({msg:'ERROR SAVING BADGE',status:500,success:false});
        })
}