let token;
if(localStorage.getItem('_moneygest_user')){
    token = JSON.parse(localStorage.getItem('_moneygest_user')).token
}else{
    token =''
}

export default token;