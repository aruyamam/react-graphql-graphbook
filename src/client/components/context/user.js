import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';

const UserConsumer = ({ children }) => (
  <ApolloConsumer>
    {(client) => {
      const user = {
        username: 'Test User',
        avatar: '/uploads/avatar1.png',
      };

      return React.Children.map(children, child => React.cloneElement(child, { user }));
    }}
  </ApolloConsumer>
);

UserConsumer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserConsumer;
