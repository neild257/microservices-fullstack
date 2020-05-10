import React from 'react';
import CommentCreate from '../CommentCreate/CommentCreate';

import './PostItem.css';
import CommentList from '../CommentList/CommentList';

const PostItem = (props) => {
    return (
        <div className="PostItem">
            <h4>{props.title}</h4>
            <div className="PostItemBody">
                <CommentList id={props.id} />
                <CommentCreate id={props.id} />
            </div>
        </div>
    );
}

export default PostItem;