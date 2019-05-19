import React from 'react';

export default ({ user }) => {
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
