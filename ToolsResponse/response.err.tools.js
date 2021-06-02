

module.exports.error = (res,status,user,msg) => {
    console.log(msg,status)
    res.statusCode = status;
    res.setHeader("Content-Type","application/json");
    res.json({msg : "Something Went Wrong !",success: false,err:msg,status : status,user : user});
}