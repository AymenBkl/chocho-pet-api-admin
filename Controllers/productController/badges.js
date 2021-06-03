const badgeModel = require('../../Models/badge');

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
                res.json({msg:'BADGES UPDATED SUCCESSFULY',status:200,badge:badgeUpdated,success:true});
            }
            else {
                res.json({msg:'ERROR SAVING BADGE',status:500,success:false});
            }
        })
        .catch(err => {
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
                res.json({msg:'You dont"t have any badges',status:404,badges:null,success:false});
            }
            else {
                res.json({msg:'ERROR SAVING BADGE',status:500,success:false});

            }
        })
        .catch(err => {
            res.json({msg:'ERROR SAVING BADGE',status:500,success:false});
        })
}