const badgeModel = require('../../Models/badge');

module.exports.saveBadge = (badgeBody,res) => {
    let badgeId = badgeBody._id;
    if (!badgeId || badgeId == ''){
        console.log('here');
        badgeId = new mongoose.Types.ObjectId();
    }
    delete badgeBody._id;
    badgeModel.findByIdAndUpdate(badgeId,badgeBody,{new:true,upsert:true})
        .then((badgeUpdated) => {
            if (badgeUpdated) {
                res.json({res,msg:'BADGES UPDATED SUCCESSFULY',status:200,badge:badgeUpdated,success:true});
            }
            else {
                res.json({res,msg:'ERROR SAVING BADGE',status:500,success:false});
            }
        })
        .catch(err => {
            console.log(err);
            res.json({res,msg:'ERROR SAVING BADGE',status:500,success:false});
        })
}


module.exports.getBadges = (res) => {
    badgeModel.find()
        .then((badges) => {
            if (badges && badges.length > 0){
                res.json({res,msg:'BADGES',status:200,badge:badges,success:true});
            }
            else if (badges && badges.length == 0){
                res.json({res,msg:'You dont"t have any badges',status:404,badge:null,success:false});
            }
            else {
                res.json({res,msg:'ERROR SAVING BADGE',status:500,success:false});

            }
        })
        .catch(err => {
            res.json({res,msg:'ERROR SAVING BADGE',status:500,success:false});
        })
}