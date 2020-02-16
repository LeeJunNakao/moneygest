const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Stocks = require('../model/stock');
const env = require('../.env');


function findStocks(name,token){
    User.findOne({ name }, (err,user)=>{
        if(err){
            return err;
        }if(name){
            jwt.verify(token, env.authSecret, (err,decoded)=>{
                if (err) {
                    return res.status(403).send({
                        errors: ['Failed to authenticate token.']
                    })
                } else if(decoded){
                    Stocks.find({ user: user._id }, (err,stock)=>{
                        if(err){
                            return err;
                        }else{
                            return stock;
                        }
                    })
                }
            })
        }
    })
}

module.exports = findStocks;