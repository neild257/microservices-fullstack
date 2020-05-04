const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const commentsByPostId = {};

app.get('/posts/:id/comments', async (req, res) => {

});

app.post('/posts/:id/comments', async (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Application has started on ${PORT}`);
}); 