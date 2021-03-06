import React from 'react';
import PostsQuery from './components/queries/postsFeed';
import AddPostMutation from './components/mutations/addPost';
import FeedList from './components/post/feedlist';
import PostForm from './components/post/form';
import '../../assets/css/style.css';

export default () => {
  const queryVariables = { page: 0, limit: 10 };

  return (
    <div className="container">
      <AddPostMutation variables={queryVariables}>
        <PostForm />
      </AddPostMutation>
      <PostsQuery variables={queryVariables}>
        <FeedList />
      </PostsQuery>
    </div>
  );
};
