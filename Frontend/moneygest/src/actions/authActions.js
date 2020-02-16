import axios from 'axios';
import { toastr } from 'react-redux-toastr'

import consts from '../consts';

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                let json = { ...resp.data, logged: true}
                localStorage.setItem('_moneygest_user', JSON.stringify(json))
                console.log(resp.data)
                dispatch([
                    { type: 'USER_FETCHED', payload: resp.data },
                ])
            })
            .catch(e => (e.response.data.errors).forEach(error=>{
                console.log(error)
                toastr.error('Erro', error)
            }))
    }
}

export function setName(name){
    return {type: 'SET_NAME', payload: name}
}

export function login(values) {
    return submit(values, `${consts.OAPI}/login`)
}

export function register(values) {
    return submit(values, `${consts.OAPI}/register`)
}

export function logout() {
    return { type: 'LOGGED_OUT' }
}

export function changeEmail(event) {
    return { type: 'EMAIL_CHANGED', payload: event.target.value }
}

export function changePassword(event) {
    return { type: 'PASSWORD_CHANGED', payload: event.target.value }
}

export function registerHandler(registerForm) {
    return { type: 'REGISTER_FORM', payload: registerForm }
}

export function validateToken() {
    return dispatch => {
        axios.get(`${consts.API}/tokenized`)
            .then(resp => {
                dispatch([
                    { type: 'VALIDATE_TOKEN', payload: resp }
                ])
            })
            .catch(e => console.log(e));
    }

}

