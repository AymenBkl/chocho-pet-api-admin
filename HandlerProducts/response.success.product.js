
module.exports.success = (res,msg,status,products) => {
    res.statusCode = status;
    res.setHeader("Content-Type","application/json");
    res.json({msg : msg,success: true,status : status,products : products});
}