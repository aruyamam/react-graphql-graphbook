import React from 'react';
import { Helmet } from 'react-helmet';
import Feed from './Feed';
import Chats from './Chats';
import Bar from './components/bar';
import '../../assets/css/style.css';
import './components/fontawesome';

export default () => (
  <div>
    <Helmet>
      <title>Graphbook - Feed</title>
      <meta name="description" content="Newsfeed of all your friends on Graphbook" />
    </Helmet>
    <Bar />
    <Feed />
    <Chats />
  </div>
);
