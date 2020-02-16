const INITIAL_STATE = {
    stock: true
}

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'SELECT_COMPONENT':
            return action.payload
        default:
            return state
    }
}