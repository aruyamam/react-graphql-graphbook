import React from 'react';
import PropTypes from 'prop-types';

const UserBar = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="user">
      <img src={user.avatar} alt={user.username} />
      <span>{user.username}</span>
    </div>
  );
};

UserBar.defaultProps = {
  user: null,
};

UserBar.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};

export default UserBar;
