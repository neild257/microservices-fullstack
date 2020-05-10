const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

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
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    
    const currentComments = commentsByPostId[req.params.id] || [];
    currentComments.push({
        id: commentId,
        content
    });

    commentsByPostId[req.params.id] = currentComments;

    res.send(commentsByPostId[req.params.id]);
});

app.listen(PORT, () => {
    console.log(`Application has started on ${PORT}`);
}); 