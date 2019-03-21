import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import '../../assets/css/style.css';

const posts = [
  {
    id: 2,
    text: 'Lorem ipsum',
    user: {
      avatar: '/uploads/avatar1.png',
      username: 'Test User',
    },
  },
  {
    id: 1,
    text: 'Lorem ipsum',
    user: {
      avatar: '/uploads/avatar2.png',
      username: 'Test User 2',
    },
  },
];

export default class App extends Component {
  state = {
    posts,
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
    const { posts, postContent } = this.state;

    return (
      <div className="container">
        <Helmet>
          <title>Graphbook - Feed</title>
          <meta name="description" content="Newsfeed of all your friends on Graphbook" />
        </Helmet>
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
          {posts.map((post, i) => (
            <div key={post.id} className="post">
              <div className="header">
                <img src={post.user.avatar} alt="user.username" />
                <h2>{post.user.username}</h2>
              </div>
              <p className="content">{post.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
