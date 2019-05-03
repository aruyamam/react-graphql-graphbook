import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { GET_CHAT } from './queries';
import Loading from '../loading';
import Error from '../error';

class ChatQuery extends Component {
  getVariables() {
    const { variables } = this.props;
    const queryVariables = {};

    if (typeof variables.chatId !== typeof undefined) {
      queryVariables.chatId = variables.chatId;
    }

    return queryVariables;
  }

  render() {
    const { children } = this.props;
    const variables = this.getVariables();

    return (
      <Query query={GET_CHAT} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) {
            return (
              <Error>
                <p>{error.message}</p>
              </Error>
            );
          }

          const { chat } = data;

          return React.Children.map(children, child => React.cloneElement(child, { chat }));
        }}
      </Query>
    );
  }
}

ChatQuery.propTypes = {
  children: PropTypes.node.isRequired,
  variables: PropTypes.shape({
    chatId: PropTypes.number,
  }).isRequired,
};

export default ChatQuery;
