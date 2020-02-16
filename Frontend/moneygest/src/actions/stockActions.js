
import URL from '../consts'
import request from '../utils/request'

let token;
if(localStorage.getItem('_moneygest_user')){
    token = JSON.parse(localStorage.getItem('_moneygest_user')).token
}else{
    token =''
}


export function getStock(){
    return request(`${URL.API}/stock`,'get','GET_STOCKS', token)
}

export function getSummary(){
    return request(`${URL.API}/summary`,'get','GET_SUMMARY',token)
}

export function submitStock(data){
    return request(`${URL.API}/stock`,'post','SUBMIT_STOCK',token,data)
}
