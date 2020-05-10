import React, { useState, useEffect } from 'react';
import axois from 'axios';

import './PostList.css';
import PostItem from '../PostItem/PostItem';

const PostList = (props) => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axois.get('http://localhost:4000/posts');

        setPosts(res.data);
    }

    /**
     * The Empty array will only run at the end.
     */
    useEffect(() => {
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
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

export default PostList;