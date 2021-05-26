module.exports.error = (res,err,status,body,url) => {
    res.statusCode = status;
    res.setHeader("Content-Type","application/json");
    res.json({msg : "Something Went Wrong !",success: false,err:err,status : status,msg : body,url:url});
}