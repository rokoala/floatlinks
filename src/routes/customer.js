
let CustomerModel = require('../models/customer.model');
let express = require('express');
let router = express.Router();
let app = express();
let bodyParser = require('body-parser')
//Create a new customer
router.post('/customer', (req,res) => {
    if(!req.body){
        return res.status('400').send('Request body is missing.');
    }

    let model = new CustomerModel(req.body);
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0){
                return res.status(500).send(doc);
            }
            res.status(201).send(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })

});

router.get('/customer', (req, res) => {
    if(!req.query.phone){
        return res.status(400).send('Missing phone.');
    }
    CustomerModel.findOne({
        phone: req.query.phone
    })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    phone: req.query.phone
})

router.put('/customer', (req, res) => {
    if(!req.query.phone){
        return res.status(400).send('Missing phone.');
    }
    CustomerModel.findOneAndUpdate({
        phone: req.query.phone
    }, req.body, {
        new: true
    })
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    phone: req.query.phone
});

const PORT = 3001;
app.use(bodyParser.json());
app.use((req,res,next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`,req.body);
    next();
})
app.use(router);
app.listen(PORT, () => console.info(`Server has started on port ${PORT}...`))
module.exports = router