

const updateAdmin = require('./updateAdmin');

const response = require('../../UserResponse/response.controller');

module.exports.upload = (req, res) => {
    console.log(req.body.adminId);
    if (req.file) {
        var fullUrl = 'https://192.168.1.104:3443/api/images/' + req.file.filename;
        console.log(fullUrl)
        const query = {
            $set : {imageURL:fullUrl}
        }
        updateAdmin.updateAdmin(res,req.body.adminId,query)

    } else {
        response.response("error", res, "IMAGE NOT PRESENT", 500, null);
    }
}
