import axios from 'axios'
import URL from '../consts'

export default ()=>{
    return new Promise((resolve,reject)=>{
        axios.get(`${URL.API}/tokenized`)
        .then(resp=>resolve(resp))
        .catch(err=>reject(err))
    })

}