import React, { useState, useEffect } from 'react';
import axois from 'axios';

import './PostList.css';
import PostItem from '../PostItem/PostItem';

const PostList = (props) => {
    const [posts, setPosts] = useState({});

    /**
     * The Empty array will only run at the end.
     */
    useEffect(() => {
        
        const fetchPosts = async () => {
            const res = await axois.get('http://posts.com/posts');
    
            setPosts(res.data);
        }

        fetchPosts();
    }, []);

    console.log(posts);

    return (
        <div className="PostListContainer">
            <h2>Posts</h2>
            <div className="PostList">
                {
                    Object.values(posts).map((post, index) => {
                        return (
                            <PostItem 
                                key={index}
                                title={post.title}
                                id={post.id}
                                comments={post.comments || []}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

export default PostList;