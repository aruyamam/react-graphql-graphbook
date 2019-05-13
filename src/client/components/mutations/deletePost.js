import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { DELETE_POST, GET_POSTS } from '../queries/queries';

const DeletePostMutation = ({ children, post }) => {
  const variables = { page: 0, limit: 10 };
  const postId = post.id;

  return (
    <Mutation
      update={(
        store,
        {
          data: {
            deletePost: { success },
          },
        },
      ) => {
        if (success) {
          const query = {
            query: GET_POSTS,
          };
          if (typeof variables !== typeof undefined) {
            query.variables = variables;
          }
          const data = store.readQuery(query);

          let i;
          for (i = 0; i < data.postsFeed.posts.length; i++) {
            if (data.postsFeed.posts[i].id === postId) {
              break;
            }
          }
          data.postsFeed.posts.splice(i, 1);
          store.writeQuery({ ...query, data });
        }
      }}
      mutation={DELETE_POST}
    >
      {deletePost => React.Children.map(children, child => React.cloneElement(child, { deletePost, postId }))
      }
    </Mutation>
  );
};

DeletePostMutation.propTypes = {
  children: PropTypes.node.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default DeletePostMutation;
