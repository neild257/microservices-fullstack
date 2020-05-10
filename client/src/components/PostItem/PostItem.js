import React from 'react';
import CommentCreate from '../CommentCreate/CommentCreate';

import './PostItem.css';

const PostItem = (props) => {
    return (
        <div className="PostItem">
            <h4>{props.title}</h4>
            <div className="PostItemBody">
                <CommentCreate id={props.id} />
            </div>
        </div>
    );
}

export default PostItem;