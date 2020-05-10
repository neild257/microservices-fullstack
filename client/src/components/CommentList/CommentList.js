import React from 'react';

import './CommentList.css';

const CommentList = (props) => {

    return (
        <div className="CommentList">
            <ul>
                {
                    props.comments.map((comment) => {
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