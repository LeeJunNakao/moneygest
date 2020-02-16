import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getStock, submitStock } from '../actions/stockActions'
import teste from '../actions/teste'

class Stocks extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getStock()
        this.submit()
    }


    transformDate(date){
        date = date.split('T')
        date = date[0]
        date = date.split('-')
        let day = date[2]
        let month = date[1]
        let year = date[0]
       
         return  `${day}/${month}/${year}`
    }

    submit(){
        let form = document.querySelector('.stocks-form')
        form.addEventListener('submit',event=>{
            event.preventDefault();
            let json = {};
            let elements = [...event.target.elements]
            elements.forEach(el=>{
                if(el['name']){
                    json[el.name] = el.value
                }
            })
           this.props.submitStock(json)
           this.props.getStock()
         
        })
    }

    request() {
            let list = this.props.stockList.map(item => (
                    <tr>
                        <td>{this.transformDate(item.date)}</td>
                        <td>{item.stockName}</td>
                        <td>{item.quantity}</td>
                        <td>{`R$ ${parseFloat(item.value).toFixed(2)}`}</td>
                        <td>{`R$ ${parseFloat(item.total).toFixed(2)}`}</td>
                    </tr>
                )
            )
            return (
                <div className="stocks-container">

                <div>
                <form className="stocks-form">
                    <input type="date" name="date"/>
                    <input type="text" name="stockName" placeholder="Sigla do papel"/>
                    <input type="text" name="quantity" placeholder="Quantidade"/>
                    <input type="text" name="value" placeholder="Valor"/>
                    <select type="text" name="operation" placeholder="Operação">
                        <option value="Compra">Compra</option>
                    </select>
                    <input type="submit" className="button" value="Salvar" onSubmit={this.submit}/>
                </form>
                </div>

                <div className="table">
                <table >
                    <thead className="table-head">
                        <th className="th">Data</th>
                        <th className="th">Nome</th>
                        <th className="th">Quantidade</th>
                        <th className="th">Valor</th>
                        <th className="th">Total</th>
                    </thead>
                    <tbody className="tbody">
                        {list}
                    </tbody>
                </table>
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

const mapStateToProps = state=>({
    stockList: state.stock.stockList
})

const mapDispatchToProps = dispatch => bindActionCreators({ getStock, submitStock }, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Stocks);