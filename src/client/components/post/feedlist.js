import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Post from '.';
import Loading from '../loading';

export default class Feed extends Component {
  state = {
    hasMore: true,
    page: 0,
  };

  loadMore = (fetchMore) => {
    const self = this;
    const { page } = this.state;

    fetchMore({
      variables: {
        page: page + 1,
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        if (!fetchMoreResult.postsFeed.posts.length) {
          self.setState({ hasMore: false });

          return previousResult;
        }

        self.setState({ page: page + 1 });
        const newData = {
          postsFeed: {
            __typename: 'PostFeed',
            posts: [...previousResult.postsFeed.posts, ...fetchMoreResult.postsFeed.posts],
          },
        };

        return newData;
      },
    });
  };

  render() {
    const { posts, fetchMore } = this.props;
    const { hasMore } = this.state;

    return (
      <div className="feed">
        <InfiniteScroll
          loadMore={() => this.loadMore(fetchMore)}
          hasMore={hasMore}
          loader={<Loading key="loader" />}
        >
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
