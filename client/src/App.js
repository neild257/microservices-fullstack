import React from 'react';

import PostCreate from './components/PostCreate/PostCreate';
import './App.css';
import PostList from './components/PostList/PostList';

function App() {
  return (
    <div className="App">
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
