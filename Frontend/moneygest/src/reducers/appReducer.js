
const INITIAL_STATE = ()=>{
    if(JSON.parse(localStorage.getItem('_moneygest_user'))){
        return({header: true,
            nav: true,
            home: true,
            login: false,})
    }else{
        return({header: false,
            nav: false,
            home: false,
            login: true,})
    }


}
export default (state=INITIAL_STATE(),action)=>{
    switch(action.type){
        case 'LOGGED_IN':
            return { ...state, header: true, nav: true, home: true, login:false}
        case 'LOGGED_OUT':
            return { ...state, header: false, nav: false, home: false, login: true}
        default:
            return state

    }
}