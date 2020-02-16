import axios from 'axios';

function request(url,method,type,token,data=null){
    return dispatch=>{
        axios({
            method,
            url,
            headers: {
                'Content-Type': 'application/JSON',
                'accept':"*/*",
                token
            },
            data,
        }).then(resp=>{
            dispatch([
                {type, payload: resp.data}
            ])
        })
        .catch(err=>console.error(err))
    }
}

export default request;