import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import Header from './Header'
import Nav from './Nav'
import Stocks from './Stocks'
import Home from './Home'
import { selectHome } from '../actions/bodyActions'


class Body extends Component {
    constructor(props) {
        super(props)
        this.selectComponent = this.selectComponent.bind(this)
    }



    selectComponent(){
      if(this.props.stock){
          return <Stocks/>
      }else if(this.props.home){
        return <Home/>
      }
    }

    render() {
        let component = this.selectComponent()
        return (
            <div>
                <Header />
                <div className="central-container">
                    <Nav />
                    <main className="main">
                        {component}
                    </main>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state =>({
    stock: state.body.stock,
    home: state.body.home
})


export default connect(mapStateToProps)(Body);