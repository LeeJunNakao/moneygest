const auth = require('../../config/auth')
const Stock = require('../../api/model/stockService')
const DbQuery = require('../../api/util/databaseQuery');
const defineUser = require('../../api/util/defineUser');


module.exports = (server, express) => {

    const protectedAPI = express.Router();

    server.use('/api', protectedAPI);
    protectedAPI.use(auth);

    protectedAPI.get('/stock', async (req, res) => {
        try {
            let dbQuery = await new DbQuery(req);
            let stock = await dbQuery.find(Stock)
            res.send(stock);
        } catch (e) {
            console.error(e)
        }
    })

    protectedAPI.post('/stock', async (req, res) => {
        let dbQuery = await new DbQuery(req);
        await dbQuery.include(Stock, req.body)
            .then(resp => {
                res.send(resp)
            })
            .catch(err => console.error(err))
    });

    protectedAPI.delete('/stock', async (req, res, next) => {
        let _id = req.body._id
        let dbQuery = await new DbQuery(req);
        dbQuery.delete(Stock, _id)
            .then(resp => res.send(resp))
            .catch(err => console.error(err))
    });

    protectedAPI.get('/summary', async (req, res, next) => {
        let token = req.headers.token || req.query.token
        let user = await defineUser(token)
        Stock.aggregate([
            { $match: { user } },
            { $group: { _id: "$stockName", total: { $sum: "$total" } } }
        ]).then(resp => {
            res.send(resp)
        });
    })

    protectedAPI.get('/tokenized', (req, res, next) => {
        res.send(true)
    })
}
