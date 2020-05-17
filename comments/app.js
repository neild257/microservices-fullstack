const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4001;

const commentsByPostId = {};

/**
 * Get Method to get all comments for the give Post Id.
 */
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

/**
 * Post Method to create a new comment and push in the current list 
 * of comments identified with Post Id.
 */
app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    
    const currentComments = commentsByPostId[req.params.id] || [];
    currentComments.push({
        id: commentId,
        content,
        moderationStatus: 'pending'
    });

    commentsByPostId[req.params.id] = currentComments;

    console.log('Inside the CommentCreated Event in Comment Service and payload is:', commentsByPostId[req.params.id]);

    // sending the events to the events bus
    await axios.post('http://localhost:4002/events', {
        type: 'CommentCreated',
        payload: {
            id: commentId,
            content,
            postId: req.params.id,
            moderationStatus: 'pending'
        },
    });

    res.send(commentsByPostId[req.params.id]);
});

app.post('/events', async (req, res) => {
    console.log(`Received Event in Comments Service: ${req.body.type}`);
    const { type, payload } = req.body;

    if (type === 'CommentModerated') {
        const { moderationStatus, postId, id, content } = payload;
        console.log('Inside Comment Moderated Event of Comments Service with Payload', payload);
        commentsByPostId[postId].find((comment) => comment.id === id).moderationStatus = moderationStatus;

        await axios.post('http://localhost:4002/events', {
            type: 'CommentUpdated',
            payload: {
                id,
                moderationStatus,
                content,
                postId
            }
        });
    }

    res.send({});
});

app.listen(PORT, () => {
    console.log(`Application has started on ${PORT}`);
}); 