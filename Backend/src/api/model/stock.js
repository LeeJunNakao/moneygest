const mongoose = require('mongoose');
const restful = require('node-restful');

const StockSchema = new mongoose.Schema({
    user:{type: String, required: true},
    stockName: {type: String, required: true},
    quantity: {type: Number, required: true},
    value: {type: Number, required: true, min: 0},
    operation: {type: String, required: true, uppercase: true,
        enum:['COMPRA','VENDA']},
    total: {type:Number, required: false},
    date: { type: Date, required: true }
});

module.exports = restful.model('Stock',StockSchema)