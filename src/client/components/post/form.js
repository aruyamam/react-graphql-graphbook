import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostForm extends Component {
  handlePostContentChange = (event) => {
    const { changePostContent } = this.props;
    changePostContent(event.target.value);
  };

  render() {
    const { addPost, changePostContent, postContent } = this.props;

    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ variables: { post: { text: postContent } } }).then(() => {
              changePostContent('');
            });
          }}
        >
          <textarea
            value={postContent}
            onChange={this.handlePostContentChange}
            placeholder="Write your custom post!"
          />
          <input type="submit" value="Sbumit" />
        </form>
      </div>
    );
  }
}

PostForm.defaultProps = {
  addPost: null,
  changePostContent: null,
  postContent: '',
};

PostForm.propTypes = {
  addPost: PropTypes.func,
  changePostContent: PropTypes.func,
  postContent: PropTypes.string,
};

export default PostForm;
