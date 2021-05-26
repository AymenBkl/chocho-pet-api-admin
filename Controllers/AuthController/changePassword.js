const AdminModel = require('../../Models/admin');
const response = require('../../UserResponse/response.controller');

module.exports.changePassword = (req,res,next) => {
    console.log(req.user.username,req.body.oldPassword);
    AdminModel.findByUsername(req.user.username)
        .then((sanitizedAdmin) => {
        console.log(sanitizedAdmin);
        if (sanitizedAdmin){
            sanitizedAdmin.changePassword(req.body.oldPassword,req.body.newPassword)
                .then(updateAdmin =>{
                    console.log('updated',updateAdmin);
                AdminModel.updateOne({AdminId:req.body.AdminId},updateAdmin)
                    .then((Admin) => {
                        console.log(Admin)
                        if (Admin){
                            response.response("success", res, "YOUR PASSWORD HAS BEEN Changed", 200,Admin);
                        }
                        else {
                          response.response("error", res, err, 404,null);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        response.response("error", res, err, 500,null);
                    });
            })
            .catch(err => {
                console.log(err)
                response.response("error", res, err, 500,null);
            });
        } else {
            response.response("error", res, "Admin DOSN'T EXIST", 404,null);
        }
    },(err) => {
        console.log(err)
        response.response("error", res, err, 500,null);
    })
    .catch(err => {
        console.log(err)
        response.response("error", res, err, 500,null);
    })
}