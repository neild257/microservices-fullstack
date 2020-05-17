const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const PORT = process.env.PORT || 4003;

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, payload } = req.body;
    if (type === 'CommentCreated') {
        const { id, content, postId } = payload;
        const moderationStatus = content.includes('orange') ? 'rejected' : 'approved';

        console.log('Inside the CommentCreated Event in Moderation Service and payload is:', payload, moderationStatus);
        
        await axios.post('http://localhost:4002/events', {
            type: 'CommentModerated',
            payload: {
                id, content, moderationStatus, postId
            }
        }); 
    }
    // just to send somthing that mark it to be handled
    res.send({});
});

app.listen(PORT, () => {
    console.log(`Moderation Service started on ${PORT}`);
});