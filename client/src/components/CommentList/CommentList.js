import React from 'react';

import './CommentList.css';

const CommentList = (props) => {

    return (
        <div className="CommentList">
            <ul>
                {
                    props.comments.map((comment) => {
                        let content;
                        switch(comment.moderationStatus) {
                            case 'approved':
                                content = `${comment.content} has been approved`;
                                break;
                            case 'rejected':
                                content = `${comment.content} has been rejected`;
                                break;
                            case 'pending':
                                content = `${comment.content} still waiting for moderation`;
                                break;
                            default:
                                content = '';
                                break;
                        }
                        
                        return (
                            <li key={comment.id}>
                                {content}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default CommentList;