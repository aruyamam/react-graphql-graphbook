import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { GET_POSTS } from './queries';
import Loading from '../loading';
import Error from '../error';

export class PostsFeed extends Component {
  getVariables() {
    const { variables } = this.props;
    const queryVariables = {
      page: 0,
      limit: 10,
    };

    if (typeof variables !== typeof undefined) {
      if (typeof variables.page !== typeof undefined) {
        queryVariables.page = variables.page;
      }
      if (typeof variables.limit !== typeof undefined) {
        queryVariables.limit = variables.limit;
      }
    }

    return queryVariables;
  }

  render() {
    const { children } = this.props;
    const variables = this.getVariables();

    return (
      <Query query={GET_POSTS} variables={variables}>
        {({
          loading, error, data, fetchMore,
        }) => {
          if (loading) return <Loading />;
          if (error) {
            return (
              <Error>
                <p>error.message</p>
              </Error>
            );
          }

          const { postsFeed } = data;
          const { posts } = postsFeed;

          return React.Children.map(children, child => React.cloneElement(child, { posts, fetchMore }));
        }}
      </Query>
    );
  }
}

PostsFeed.propTypes = {
  children: PropTypes.node.isRequired,
  variables: PropTypes.shape({
    limit: PropTypes.number,
    page: PropTypes.number,
  }).isRequired,
};

export default PostsFeed;
