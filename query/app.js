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
            break;
        case 'CommentCreated':
            const commentId = payload.id;
            const { content, postId } = payload;
            
            queryState[postId].comments.push({
                id: commentId, 
                content
            });
            break;
        default:
            break;
    }

    res.send({});
});

app.listen(PORT, () => {
    console.log(`App has started listing on ${PORT}`);
});