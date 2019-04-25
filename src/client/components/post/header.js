import React from 'react';
import PropTypes from 'prop-types';

const header = ({ post }) => (
  <div className="header">
    <img src={post.user.avatar} alt={post.user.username} />
    <h2>{post.user.username}</h2>
  </div>
);

header.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default header;
