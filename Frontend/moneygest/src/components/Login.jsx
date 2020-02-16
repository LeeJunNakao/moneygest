import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { login, changeEmail, changePassword, registerHandler, register } from '../actions/authActions';
import If from './If'

class AuthManager extends Component {

    constructor(props) {
        super(props);
        this.registerHand = this.registerHand.bind(this);
    }
    componentDidMount() {
        let form = document.getElementById('form');
        try{
            form.addEventListener('submit', event => {
                event.preventDefault();
    
                let json = {};
                let elementos = event.target.elements;
                [...elementos].forEach(el => {
                    if (el['name']) {
                        json[el.name] = el.value
                    }
                });
                if(this.props.registerForm){
                    this.props.register(json)
                }else{
                    this.props.login(json);
                   
                }
                
            })
        }catch(e){
            return false
        }

    }

    registerHand() {
        this.props.registerHandler(!this.props.registerForm)
    }

    

    render() {
        return (
            <main>
           
            <form role="form" id="form" className="login-form">
                <div className="login-box">
                    <div className="login-title">MoneyGest</div>
                    <div className="login-subtitle">Faça o Login para continuar</div>
                    <If show={this.props.registerForm}>
                        <input type="text" name="name" className="login-input" placeholder="Digite seu nome" />
                    </If>
                    <input type="email" name="email" className="login-input" placeholder="Digite seu email" value={this.props.email} onChange={this.props.changeEmail} />
                    <input type="password" name="password" className="login-input" placeholder="Digite sua senha" onChange={this.props.changePassword} />
                    <If show={this.props.registerForm}>
                        <input type="password" name="confirm_password" className="login-input" placeholder="Repita sua senha" />
                    </If>
                    <input type="submit" className="login-submit" value="OK" />
                    <If show={!this.props.registerForm}>
                        <a href="#" onClick={this.registerHand}>Registre aqui</a>
                    </If>
                    <If show={this.props.registerForm} >
                        <a href="#" onClick={this.registerHand}>Fazer login</a>
                    </If>

                </div>
            </form>
            </main>
        )
    }
}


const mapStateToProps = (state) => ({
    email: state.auth.email,
    password: state.auth.password,
    registerForm: state.auth.registerForm,
    show: state.app.login
})

const mapDispatchToProps = dispatch => bindActionCreators({ changeEmail, changePassword, login, registerHandler, register }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AuthManager);

