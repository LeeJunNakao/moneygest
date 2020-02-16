const AuthService = require('../../api/user/authService')

module.exports =(server, express)=>{
    const openApi = express.Router();
    
    server.use('/oapi',openApi);
    
    openApi.post('/login', AuthService.login)
    openApi.post('/register', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
    openApi.get('/register',(req,res)=>{
        res.send('Faça o cadastro')
    })
    
}