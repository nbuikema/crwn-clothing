const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
require('dotenv').config();
const enforce = require('express-sslify');

const stripe = require('stripe')();

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, error => {
    if(error) {
        throw error;
    }
    console.log(`server started on port ${port}`);
});

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

app.post('/payment', (req, res) => {
    console.log(process.env.STRIPE_SECRET_KEY);

    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    });
});