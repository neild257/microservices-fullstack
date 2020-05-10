import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './CommentList.css';

const CommentList = (props) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        
        const fetchComments = async () => {
            const res = await axios.get(`http://localhost:5000/posts/${props.id}/comments`);
    
            setComments(res.data);
        }

        fetchComments();
    }, [props.id]);

    return (
        <div className="CommentList">
            <ul>
                {
                    comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                {comment.content}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default CommentList;