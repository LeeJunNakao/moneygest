const jwt = require('jsonwebtoken');
const env = require('../../.env');

module.exports = (token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token, env.authSecret, (err,decoded)=>{
            if(err){
                reject(false)
            }else{
                resolve(decoded._doc._id)
            }
        })
    })
 


}