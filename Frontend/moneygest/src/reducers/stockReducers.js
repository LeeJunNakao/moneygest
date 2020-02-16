const INITIAL_STATE = {
    stockList: [],
    stockSummary: []
}
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'GET_STOCKS':
            return { ...state, stockList: action.payload}
        case 'GET_SUMMARY':
            return { ...state, stockSummary: action.payload}
        case 'SUBMIT_STOCK':
            return state
        default:
            return state
    }
}