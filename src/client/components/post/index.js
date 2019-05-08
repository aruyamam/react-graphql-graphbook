import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostHeader from './header';
import PostContent from './content';
import PostForm from './form';
import UpdatePostMutation from '../mutations/updatePost';

export default class Post extends Component {
  state = {
    editing: false,
  };

  changeState = () => {
    this.setState(prevSate => ({ editing: !prevSate.editing }));
  };

  render() {
    const { editing } = this.state;
    const { post } = this.props;

    return (
      <div className={`post ${post.id < 0 ? 'optimistic' : ''}`}>
        <PostHeader post={post} changeState={this.changeState} />
        {!editing && <PostContent post={post} />}
        {editing && (
          <UpdatePostMutation post={post}>
            <PostForm changeState={this.changeState} />
          </UpdatePostMutation>
        )}
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
