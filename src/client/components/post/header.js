import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from '../helpers/dropdown';
import DeletePostMutation from '../mutations/deletePost';

const DeleteButton = ({ deletePost, postId }) => (
  <button type="button" onClick={() => deletePost({ variables: { postId } })}>
    Delete
  </button>
);

DeleteButton.defaultProps = {
  deletePost: null,
  postId: 0,
};

DeleteButton.propTypes = {
  deletePost: PropTypes.func,
  postId: PropTypes.number,
};

const header = ({ changeState, post }) => (
  <div className="header">
    <img src={post.user.avatar} alt={post.user.username} />
    <div>
      <h2>{post.user.username}</h2>
    </div>
    <Dropdown trigger={<FontAwesomeIcon icon="angle-down" />}>
      <button type="button" onClick={changeState}>
        Edit
      </button>
      <DeletePostMutation post={post}>
        <DeleteButton />
      </DeletePostMutation>
    </Dropdown>
  </div>
);

header.propTypes = {
  changeState: PropTypes.func.isRequired,
  post: PropTypes.shape({
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default header;
