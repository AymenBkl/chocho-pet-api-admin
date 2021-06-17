const prepareRequest = require('./prepareRequest');
const loggerController = require('../../Controllers/Logger/logger.controller');

module.exports.createPriceRule = (req, res, next) => {
    req.body.options.price_rule.starts_at = new Date().toISOString();
    prepareRequest.prepareRequest('POST', 'price_rules.json', req.body.options)
        .then((result) => {
            console.log(result);
        })
        .catch(err => {
            loggerController.insertEmailLogger({level:'ERROR',type:'CREATE DISCOUNT',msg:'ERORR WHILE CREATE DISCOUNT' + new Error(err)});
            console.log(err);
        })
}


module.exports.createDiscount = () => {
    return new Promise(resolve => {
        let body = {
            discount_code : {
                code:makeCouponCode(10),
                price_rule_id:931714400435,
            }
            
        }
        prepareRequest.prepareRequest('POST', 'price_rules/931714400435/discount_codes.json',body)
            .then((result) => {
                resolve(result);
            })
            .catch(err => {                
                loggerController.insertEmailLogger({level:'ERROR',type:'CREATE DISCOUNT',msg:'ERORR WHILE CREATE DISCOUNT' + new Error(err)});
                resolve(err);
            })
    })
    
}


function makeCouponCode(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}