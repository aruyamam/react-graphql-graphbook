import React from 'react';
import PropTypes from 'prop-types';

const content = ({ post }) => <p className="content">{post.text}</p>;

content.propTypes = {
  post: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default content;
