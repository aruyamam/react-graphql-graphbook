import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import PostsQuery from './components/queries/postsFeed';
import FeedList from './components/post/feedlist';
import '../../assets/css/style.css';

const ADD_POST = gql`
  mutation addPost($post: PostInput!) {
    addPost(post: $post) {
      id
      text
      user {
        username
        avatar
      }
    }
  }
`;

export default class Feed extends Component {
  state = {
    postContent: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { posts, postContent } = this.state;
    const newPost = {
      id: posts.length + 1,
      text: postContent,
      user: {
        avatar: '/uploads/avatar1.png',
        username: 'Fake User',
      },
    };

    this.setState(prevState => ({
      posts: [newPost, ...prevState.posts],
      postContent: '',
    }));
  };

  handlePostContentChange = (event) => {
    this.setState({ postContent: event.target.value });
  };

  render() {
    const self = this;
    const { postContent, hasMore } = this.state;

    return (
      <div className="container">
        <div className="postForm">
          <Mutation
            mutation={ADD_POST}
            update={(store, { data: { addPost } }) => {
              const variables = { page: 0, limit: 10 };
              const data = store.readQuery({ query: GET_POSTS, variables });
              data.postsFeed.posts.unshift(addPost);
              store.writeQuery({ query: GET_POSTS, variables, data });
            }}
            optimisticResponse={{
              __typename: 'Mutation',
              addPost: {
                __typename: 'Post',
                text: postContent,
                id: -1,
                user: {
                  __typename: 'User',
                  username: 'Loading...',
                  avatar: '/public/loading.gif',
                },
              },
            }}
          >
            {addPost => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addPost({ variables: { post: { text: postContent } } }).then(() => {
                    self.setState(prevState => ({
                      postContent: '',
                    }));
                  });
                }}
              >
                <textarea
                  value={postContent}
                  onChange={self.handlePostContentChange}
                  placeholder="Write your custom post!"
                />
                <input type="submit" value="Submit" />
              </form>
            )}
          </Mutation>
        </div>
        <PostsQuery>
          <FeedList />
        </PostsQuery>
      </div>
    );
  }
}
