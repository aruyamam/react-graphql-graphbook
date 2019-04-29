import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { ADD_POST, GET_POSTS } from '../queries/queries';

class AddPostMutation extends Component {
  state = {
    postContent: '',
  };

  changePostContent = (value) => {
    this.setState({ postContent: value });
  };

  render() {
    const self = this;
    const { children, variables } = this.props;
    const { postContent } = this.state;

    return (
      <Mutation
        update={(store, { data: { addPost } }) => {
          const query = { query: GET_POSTS };
          if (typeof variables !== typeof undefined) {
            query.variables = variables;
          }
          const data = store.readQuery(query);
          data.postsFeed.posts.unshift(addPost);
          store.writeQuery({ ...query, data });
        }}
        optimisticResponse={{
          __typename: 'Mutation',
          addPost: {
            __typename: 'Post',
            text: postContent,
            id: -1,
            user: {
              __typename: 'User',
              username: 'Loading...',
              avatar: '/public/loading.gif',
            },
          },
        }}
        mutation={ADD_POST}
      >
        {addPost => React.Children.map(children, child => React.cloneElement(child, {
          addPost,
          postContent,
          changePostContent: self.changePostContent,
        }))
        }
      </Mutation>
    );
  }
}

AddPostMutation.propTypes = {
  children: PropTypes.node.isRequired,
  variables: PropTypes.shape({
    limit: PropTypes.number,
    page: PropTypes.number,
  }).isRequired,
};

export default AddPostMutation;
