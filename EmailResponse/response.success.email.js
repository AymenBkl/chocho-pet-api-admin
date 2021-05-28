
module.exports.success = (res,msg,status,user) => {
    res.statusCode = status;
    res.setHeader("Content-Type","application/json");
    res.json({msg : "Welcom to BitExplode ",success: true,msg : msg,status : status,user : user}); 
}