const express = require('express');
const auth = require('./src/config/auth');
const AuthService = require('./src/api/user/authService')

require('./database');

const server = require('./src/config/server');
const User = require('./src/api/model/userService');
const Stock = require('./src/api/model/stockService')
const DbQuery = require('./src/api/util/databaseQuery');
const defineUser = require('./src/api/util/defineUser');

const protectedApi = express.Router();
server.use('/api', protectedApi)
protectedApi.use(auth)



protectedApi.get('/stock', async (req,res)=>{
    
    let token = req.headers.token || req.query.token
    try{
        let dbQuery = await new DbQuery({ token });
        let stock = await dbQuery.find(Stock)
        res.send(stock);
    }catch(e){
        console.error(e)
    }    
})

protectedApi.post('/stock', async (req,res)=>{
    let token = req.headers.token || req.query.token;
    let dbQuery = await new DbQuery({ token });
    await dbQuery.include(Stock,req.body)
        .then(resp=>{
            res.send(resp)
        })
        .catch(err=>console.error(err))
});

protectedApi.delete('/stock', async (req,res,next)=>{
    let token = req.headers.token || req.query.token;
    let _id = req.body._id
    let dbQuery = await new DbQuery({ token });
    dbQuery.delete(Stock,_id)
        .then(resp=> res.send(resp))
        .catch(err=>console.error(err))
});

protectedApi.get('/summary', async (req,res, next)=>{
    let token = req.headers.token || req.query.token
    let user = await defineUser(token)
    Stock.aggregate([
        {$match: { user }},
        {$group: { _id: "$stockName", total: {$sum: "$total"}}}
      
    ]).then(resp=>{
        res.send(resp)
    });    
})

protectedApi.get('/tokenized', (req,res,next)=>{
    res.send(true)
})



const openApi = express.Router();
server.use('/oapi',openApi);

openApi.post('/login', AuthService.login)
openApi.post('/register', AuthService.signup)
openApi.post('/validateToken', AuthService.validateToken)

openApi.get('/register',(req,res)=>{
    res.send('Faça o cadastro')
})

openApi.post('/teste',(req,res,next)=>{
    console.log(req.body)
})






