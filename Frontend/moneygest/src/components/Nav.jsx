import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import home from '../assets/images/home.png'
import cifrao from '../assets/images/cifrao.png'
import logoutPic from '../assets/images/logout.png'
import statistics from '../assets/images/statistics.png'
import money from '../assets/images/money.png'
import {logout} from '../actions/authActions'

import { selectComponent } from '../actions/bodyActions'


class Nav extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this)
        this.select = this.select.bind(this)
    }
    
    logout(){
        localStorage.removeItem('_moneygest_user');
        this.props.logout();
    }

    select(event){
        this.props.selectComponent(event.target.dataset.name)       
    }

    render() {
        return (

            <nav className="nav-menu">

                <div className="menu-item"  >
                    <div className="item-image" >
                        <img src={home} width="40px" height="40px" onClick={this.select} data-name="home"/>
                    </div>
                    <div className="item-description" onClick={this.select} data-name="home">Home</div>
                </div>

                <div className="menu-item"  >
                    <div className="item-image">
                        <img src={money} width="40px" height="40px" onClick={this.select} data-name="stock" />
                    </div>
                    <div className="item-description" data-name="stock" onClick={this.select} data-name="stock">Ações</div>
                </div>

                <div className="menu-item" >
                    <div className="item-image" >
                        <img src={cifrao} width="40px" height="40px"/>
                    </div>
                    <div className="item-description">Resumo</div>
                </div>

                <div className="menu-item">
                    <div className="item-image">
                        <img src={statistics} width="40px" height="40px" />
                    </div>
                    <div className="item-description">Indices</div>
                </div>

                <div className="menu-item" onClick={this.logout}>
                    <div className="item-image" >
                        <img src={logoutPic} width="40px" height="40px" />
                    </div>
                    <div className="item-description">Logout</div>
                </div>
            </nav>

        )
    }
}

const mapStateToProps = state=>({
    show: state.app.nav
})
const mapDispatchToProps = dispatch => bindActionCreators({ logout, selectComponent }, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Nav);


