import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSummary } from '../actions/stockActions'


import token from '../utils/getToken'
import request from '../utils/requestData'
import URL from '../consts'
import Chart from '../utils/grafico'


class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getSummary()
        request(`${URL.API}/summary`,'get',token)
            .then(resp=> {
                const data=[];
                resp.forEach(item=>{
                    const json = {name:item._id,value:item.total}
                    data.push(json)
                })
                new Chart(data,'500','.stock-chart','ATIVOS')
            })
    
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


            <div className="home-container">
                <div className="stock-chart">

                </div>
                <div className="table-container">
                 {list}
                </div>
               
            </div>
        )
    }


    render() {
        let stocks = this.request();
        return (
            [stocks]
        )
    }
}

const mapStateToProps = state => ({
    show: state.app.home,
    stockSummary: state.stock.stockSummary
})

const mapDispatchToProps = dispatch => bindActionCreators({ getSummary }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home);