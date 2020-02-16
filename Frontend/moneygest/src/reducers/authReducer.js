const userKey = '_moneygest_user';

const generateInitialState = ()=>{
    if(localStorage.getItem(userKey)){
        const user = JSON.parse(localStorage.getItem(userKey))
        const username = user.name
        const logged = user.logged
        return { username, logged, email: '', password: '', registerForm: false }
    }else{
        return { username: '', logged: false, email: '', password: '', registerForm: false}
    }
}


const INITIAL_STATE = generateInitialState()

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'TOKEN_VALIDATED':
                return { ...state, logged: true }
            
        case 'USER_FETCHED':
            return { ...state, user: action.payload, logged: 'true' }
            
        case 'EMAIL_CHANGED':
            return { ...state, email: action.payload }

        case 'PASSWORD_CHANGED':
            return{...state, password: action.payload}

        case 'REGISTER_FORM':
            return{...state, registerForm: action.payload}

        case 'VALIDATE_TOKEN':
            return {...state, logged: action.payload}

        case 'SET_NAME':
            return {...state, username: action.payload}
        
        case 'LOGGED_OUT':
            return { ...state, logged: false}

        default:
            return state;
    }
}