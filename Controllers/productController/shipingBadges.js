const shipingBadgeModel = require('../../Models/shipingBadges');

const mongoose = require('mongoose');

const loggerController = require('../Logger/logger.controller');

module.exports.saveBadgeShiping = (badgeBody,res) => {
    let badgeId = badgeBody._id;
    if (!badgeId || badgeId == ''){
        badgeId = new mongoose.Types.ObjectId();
    }
    delete badgeBody._id;
    delete badgeBody.createdAt;
    shipingBadgeModel.findByIdAndUpdate(badgeId,badgeBody,{new:true,upsert:true})
        .then((badgeUpdated) => {
            if (badgeUpdated) {
                loggerController.insertProductLogger({level:'SUCCESS',type:'SHIPPING BADGES',msg:'SHIPPING BADGE UPDATED SUCCESSFULLY'});
                res.json({msg:'BADGES UPDATED SUCCESSFULY',status:200,badge:badgeUpdated,success:true});
            }
            else {
                loggerController.insertProductLogger({level:'ERROR',type:'SHIPPING BADGES',msg:'ERROR WHILE UPDATING SHIPPING BADGE'});
                res.json({msg:'ERROR SAVING BADGE',status:500,success:false});
            }
        })
        .catch(err => {
            loggerController.insertProductLogger({level:'ERROR',type:'SHIPPING BADGES',msg:'ERROR WHILE UPDATING SHIPPING BADGE' + new Error(err)});
            if (err && err.code == 11000){
                res.json({msg:'Name Already Exists',status:500,success:false});
            }
            else {
                res.json({msg:'ERROR SAVING BADGE',status:500,success:false});
            }
        })
}


module.exports.getBadgesShiping = (res) => {
    shipingBadgeModel.find()
        .then((badges) => {
            if (badges && badges.length > 0){
                res.json({msg:'BADGES',status:200,badges:badges,success:true});
            }
            else if (badges && badges.length == 0){
                loggerController.insertProductLogger({level:'WARNING',type:'SHIPPING BADGES',msg:'NO SHIPPING BADGE FOUND'});
                res.json({msg:'You dont"t have any badges',status:404,badges:null,success:false});
            }
            else {
                loggerController.insertProductLogger({level:'ERROR',type:'SHIPPING BADGES',msg:'ERROR WHILE UPDATING SHIPPING BADGE'});
                res.json({msg:'ERROR GETTING BADGE',status:500,success:false});

            }
        })
        .catch(err => {
            loggerController.insertProductLogger({level:'ERROR',type:'SHIPPING BADGES',msg:'ERROR WHILE UPDATING SHIPPING BADGE' + new Error(err)});
            res.json({msg:'ERROR GETTING BADGE',status:500,success:false});
        })
}