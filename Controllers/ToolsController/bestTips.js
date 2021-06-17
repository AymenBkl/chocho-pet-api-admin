const bestTipModel = require('../../Models/best-tips');

const toolsResponse = require('../../ToolsResponse/response.controller');

const mongoose = require('mongoose');

const loggerController = require('../Logger/logger.controller');

module.exports.saveBestTip = (tipBody,res) => {
    let tipsId = tipBody._id;
    if (!tipsId || tipsId == ''){
        console.log('here');
        tipsId = new mongoose.Types.ObjectId();
    }
    delete tipBody._id;
    bestTipModel.findByIdAndUpdate(tipsId,tipBody,{new:true,upsert:true})
        .then((tipUpdated) => {
            if (tipUpdated) {
                toolsResponse.response('success',res,'BEST TIP UPDATED SUCCESSFULY',200,tipUpdated);
            }
            else {
                loggerController.insertToolsLogger({level:'ERROR',type:'UPDATE TIPS',msg:'ERROR ON UPDATE BEST TIPS,'});
                toolsResponse.response('error',res,'SOMETHING WENT WRONG !',500);
            }
        })
        .catch(err => {
            console.log(err);
            loggerController.insertToolsLogger({level:'ERROR',type:'UPDATE TIPS',msg:'ERROR ON UPDATE BEST TIPS,' + new Error(err)});
            toolsResponse.response('error',res,'SOMETHING WENT WRONG !',500);
        })
}

module.exports.getBestTip = (res) => {
    bestTipModel.find()
        .then((tips) => {
            console.log(tips);
            if (tips && tips.length > 0) {
                toolsResponse.response('success',res,'BEST TIP UPDATED SUCCESSFULY',200,tips);
            }
            else if (tips && tips.length == 0) {
                toolsResponse.response('error',res,'YOU HAVE NO TIPS',404);
            }
            else {
                loggerController.insertToolsLogger({level:'ERROR',type:'GET TIPS',msg:'ERROR ON GET BEST TIPS,'});
                toolsResponse.response('error',res,'SOMETHING WENT WRONG !',500);
            }
        })
        .catch(err => {
            loggerController.insertToolsLogger({level:'ERROR',type:'GET TIPS',msg:'ERROR ON GET BEST TIPS,' + new Error(err)});
            toolsResponse.response('error',res,'SOMETHING WENT WRONG !',500);
        })
}