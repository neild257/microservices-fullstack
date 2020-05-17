const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 4005;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const queryState = {};

app.get('/posts', (req, res) => {
    res.send(queryState);
});

app.post('/events', (req, res) => {
    const { type, payload } = req.body;
    
    switch(type) {
        case 'PostCreated':
            const { id, title } = payload;
            
            queryState[id] = {
                id,
                title,
                comments: []
            };
            console.log('The value of queryState after post created', queryState[postId]);
            break;
        case 'CommentCreated':
            const commentId = payload.id;
            const { content, postId, moderationStatus } = payload;
            console.log('Inside the CommentCreated Event in Query Service and payload is:', payload);
            queryState[postId].comments.push({
                id: commentId, 
                content,
                moderationStatus
            });
            console.log('The value of queryState after comment created', queryState[postId]);
            break;
        case 'CommentUpdated':
            console.log('The value of queryState before update', queryState[payload.postId]);
            const comment = queryState[payload.postId].comments.find((comment) => comment.id = payload.id);
            console.log('Inside the CommentUpdated Event in Query Service and comment is:', comment, payload);
            comment.moderationStatus = payload.moderationStatus;
            comment.content = payload.content;
            break;
        default:
            break;
    }

    res.send({});
});

app.listen(PORT, () => {
    console.log(`App has started listing on ${PORT}`);
});