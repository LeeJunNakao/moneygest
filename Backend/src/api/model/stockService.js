const Stock = require('./stock')

Stock.methods(['get','put','post','delete'])
Stock.updateOptions({ new: true, runValidators: true });

module.exports = Stock;