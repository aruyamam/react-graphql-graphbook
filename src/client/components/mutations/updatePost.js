import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { UPDATE_POST, GET_POSTS } from '../queries/queries';

export default class UpdatePostMutatoin extends Component {
  state = {
    postContent: this.props.post.text,
  };

  changePostContent = (value) => {
    this.setState({ postContent: value });
  };

  render() {
    const { children, post } = this.props;
    const { postContent } = this.state;
    const variables = { page: 0, limit: 10 };

    return (
      <Mutation
        update={(store, { data: { updatePost } }) => {
          const query = {
            query: GET_POSTS,
          };
          if (typeof variables !== typeof undefined) {
            query.variables = variables;
          }
          const data = store.readQuery(query);

          for (let i = 0; i < data.postsFeed.posts.length; i++) {
            if (data.postsFeed.posts[i].id === post.id) {
              data.postsFeed.posts[i].text = updatePost.text;
              break;
            }
          }
          store.writeQuery({ ...query, data });
        }}
        optimisticResponse={{
          __typename: 'mutation',
          updatePost: {
            __typename: 'Post',
            text: postContent,
          },
        }}
        mutation={UPDATE_POST}
      >
        {updatePost => React.Children.map(children, child => React.cloneElement(child, {
          updatePost,
          postContent,
          postId: post.id,
          changePostContent: this.changePostContent,
        }))
        }
      </Mutation>
    );
  }
}
