import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import '../../assets/css/style.css';

const GET_POSTS = gql`
  {
    posts {
      id
      text
      user {
        avatar
        username
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
    const { postContent } = this.state;

    return (
      <div className="container">
        <div className="postForm">
          <form onSubmit={this.handleSubmit}>
            <textarea
              onChange={this.handlePostContentChange}
              value={postContent}
              placeholder="Write your custom post!"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="feed">
          <Query query={GET_POSTS}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return error.message;

              const { posts } = data;

              return posts.map((post, i) => (
                <div key={post.id} className="post">
                  <div className="header">
                    <img src={post.user.avatar} alt={post.username} />
                    <h2>{post.user.username}</h2>
                  </div>
                  <p className="content">{post.text}</p>
                </div>
              ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}
