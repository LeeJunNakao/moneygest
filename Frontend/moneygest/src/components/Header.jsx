import React, {Component} from 'react'
import { connect } from 'react-redux'



class Header extends Component{
    constructor(props){
        super(props);

    }
       
    render(){
        return (
        <header className="header-site">
            <a className="header-logo" href="#">MoneyGest</a>
    
            <div className="header-info">
                <div className="header-image"></div>
                <div className="header-name">{this.props.username}</div>
            </div>
        </header>
        )
    }
}

const mapStateToProps = state =>({
    username: state.auth.username
})

export default connect(mapStateToProps)(Header)