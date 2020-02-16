const jwt = require('jsonwebtoken');
const env = require('../../.env');
const defineUser = require('./defineUser')

class DbQuery{
    constructor(parameters){
        this.parameters = parameters;
    }

    async find(collection, parameter={} ){

        this.id = await defineUser(this.parameters['token'])
        return new Promise((resolve,reject)=>{
            
            collection.find({...parameter, user: this.id})
                .sort({date: 1})
                .exec((err,res)=>{
                if(err){
                    console.log('Não foi possível localizar')
                    reject(false);
                }else{
                    resolve(res);
                }
            })
        });
    }

    async include(Collection, parameter){
        this.id = await defineUser(this.parameters['token'])
        return new Promise((resolve,reject)=>{
            let attr = { ...parameter, user: this.id }
            let total = (attr.value * attr.quantity).toFixed(2)
            new Collection({ ...attr, total })
                .save()
                .then(()=>{
                    resolve({...parameter, user: this.id})
                })
                .catch(err=>reject(err))
        })  
    }

    async delete(Collection, _id){
        this.id = await defineUser(this.parameters['token']);
        return new Promise((resolve,reject)=>{
            Collection.deleteOne({ user: this.id, _id }, err=>{
                reject(err)
            })
            resolve('ok')

        })
    }

}

module.exports = DbQuery