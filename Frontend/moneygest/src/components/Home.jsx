import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSummary } from '../actions/stockActions'


class Home extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getSummary()
    }

    componentWillUnmount(){
        console.log('home destruido')
    }

    request() {
            let list = this.props.stockSummary.map(item => (
                <div className="stock-item">
                    <div className="item-title">CONSOLIDADO</div>
                    <div className="separador"></div>
                    <div className="stock-description">
                        <div className="stock-name">{item._id} </div>
                        <div className="stock-total">{`R$ ${parseFloat(item.total).toFixed(2)}`}</div>
                    </div>
                </div>)
            )
            return (
                

                <div className="home-container">{list}</div>
           )
    }


    render() {
        let stocks = this.request();
        return (
            [stocks]
        )
    }
}

const mapStateToProps = state =>({
    show: state.app.home,
    stockSummary: state.stock.stockSummary
})

const mapDispatchToProps = dispatch => bindActionCreators({ getSummary }, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Home);