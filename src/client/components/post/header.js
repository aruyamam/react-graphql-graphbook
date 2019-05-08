import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from '../helpers/dropdown';

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
    </Dropdown>
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
