const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const PORT = process.env.PORT || 4002;

const app = express();
app.use(bodyParser.json());


app.post('/events', (req, res) => {
    const event = req.body;

    // no code to handle if anyone of them fails
    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4005/events', event);
    axios.post('http://localhost:4003/events', event);

    res.send({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Event Bus has started on ${PORT}`);
});