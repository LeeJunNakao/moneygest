import React, { Component } from 'react'
import Header from './Header'
import Nav from './Nav'
import Login from './Login'
import Home from './Home'
import { validateToken } from '../actions/authActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class Index extends Component {
    constructor(props){
        super(props);
    }


    teste() {
        if (this.props.validToken==='true') {
            return (
                <div className="container">
                <Header />
                <div className="central-container">
                    <Nav />
                    <Home />
                </div>
            </div>
            )
        } else {
            return (
                <Login/>
            )
        }
    }

    render() {
        return (
            [this.teste()]
        )
    }
}

const mapStateToProps =  (state) => ({
    validToken: state.auth.validToken
})
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Index)