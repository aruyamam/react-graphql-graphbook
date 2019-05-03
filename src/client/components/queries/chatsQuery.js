import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { GET_CHATS } from './queries';
import Loading from '../loading';
import Error from '../error';

class ChatQuery extends Component {
  render() {
    const { children } = this.props;

    return (
      <Query query={GET_CHATS}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) {
            return (
              <Error>
                <p>{error.message}</p>
              </Error>
            );
          }

          const { chats } = data;

          return React.Children.map(children, child => React.cloneElement(child, { chats }));
        }}
      </Query>
    );
  }
}

ChatQuery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChatQuery;
