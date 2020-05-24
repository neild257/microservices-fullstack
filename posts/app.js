const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

const postState = {};

app.get('/posts', async (req, res) => {
    res.status(200).send(postState);
});

app.post('/posts', async (req, res) => {
    // generating random string
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    postState[id] = {
        id, title
    };

    // adding the event on the event bus
    await axios.post('http://event-bus-service:4002/events', {
        type: 'PostCreated',
        payload: postState[id]
    });
    
    res.status(201).send(postState[id]);
});

app.post('/events', (req, res) => {
    console.log(`Received Event in Post Service: ${req.body.type}`);

    // just to acknowledge the event
    res.send({});
});

app.listen(PORT, () => {
    console.log(`Application has started on ${PORT} v3`);
}); 
