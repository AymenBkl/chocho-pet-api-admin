const request = require('request');

const shopifyConfig = require('../../config').config.shopify;

module.exports.prepareRequest = (method,endpoint,body = {}) => {
    let url = shopifyConfig.baseURL + 'admin/api/2021-04/' + endpoint;
    let username = shopifyConfig.apiKey;
    let password = shopifyConfig.apiSecret;
    let options = {
        method:method,
        url:url,
        json:true,
        headers:{
            'Authorization': `Basic ` + new Buffer(username + ":" + password).toString("base64"),
            'content-type':'application/json'
        },
    }
    if (Object.keys(body).length > 0) {
      options.json = body;
    }
    return new Promise((resolve,reject) => {
        callback = (error, response, body) => {
            if (error || response.statusCode != 200){
                if (response && response.statusCode == 201) {
                    const newBody = response.body;
                    resolve({status:true,body:newBody});
                }
              if (response && response.statusCode != 201) {
                console.log(response.body);
                  resolve({status:false,error:'Something Went Wrong !',statusCode:response.statusCode});
              }
              else if (error) {
                resolve({status:false,error:error,statusCode:500});
              }
            }
            if (!error && response.statusCode == 200) {
              const newBody = body;
              resolve({status:true,body:newBody});
            }
          };
          request(options, callback);
    }) 
}