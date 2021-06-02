
module.exports.success = (res,msg,status,object) => {
    res.statusCode = status;
    res.setHeader("Content-Type","application/json");
    res.json({msg : "Welcom To Chocho Pet ",success: true,msg : msg,status : status,object : object}); 
}