import React, { createContext } from 'react';

const { Consumer, Provider } = createContext();

export const UserProvider = ({ children }) => {
  const user = {
    username: 'Test User',
    avatar: '/uploads/avatar1.png',
  };

  return <Provider value={user}>{children}</Provider>;
};

export const UserConsumer = ({ children }) => (
  <Consumer>
    {user => React.Children.map(children, child => React.cloneElement(child, { user }))
      }
  </Consumer>
);
