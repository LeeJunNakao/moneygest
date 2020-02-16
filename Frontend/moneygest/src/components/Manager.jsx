import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Body from './Body'
import Login from './Login'

class Manager extends Component {
    constructor(props) {
        super(props)
    }

  

    verifyLogin() {
        return this.props.logged ? <Body/> : <Login/>
    }

    render() {
        const verifyLogin = this.verifyLogin()
        return (
            [ verifyLogin ]
        )
    }

}

const mapStateToProps = state => ({
    logged: state.auth.logged
})

export default connect(mapStateToProps)(Manager)