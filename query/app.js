const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const PORT = process.env.PORT || 4005;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const queryState = {};

app.get('/posts', (req, res) => {
    res.send(queryState);
});

const handleEvents = (type, payload) => {
    switch(type) {
        case 'PostCreated':
            const { id, title } = payload;
            queryState[id] = {
                id,
                title,
                comments: []
            };
            break;
        case 'CommentCreated':
            const commentId = payload.id;
            const { content, postId, moderationStatus } = payload;
            queryState[postId].comments.push({
                id: commentId, 
                content,
                moderationStatus
            });
            break;
        case 'CommentUpdated':
            const comment = queryState[payload.postId].comments.find((comment) => comment.id === payload.id);
            comment.moderationStatus = payload.moderationStatus;
            comment.content = payload.content;
            break;
        default:
            break;
    }
};

app.post('/events', (req, res) => {
    const { type, payload } = req.body;
    
    handleEvents(type, payload);

    res.send({});
});

app.listen(PORT, async () => {
    console.log(`App has started listing on ${PORT}`);

    // After the service comes online call the event bus for the missed events
    const res = await axios.get('http://localhost:4002/events');

    for (let event of res.data) {
        handleEvents(event.type, event.payload);
    }
});