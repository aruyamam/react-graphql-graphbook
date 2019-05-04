import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddMessageMutation from '../mutations/addMessage';
import ChatInput from './input';

const ChatPanel = ({ chat, closeChat }) => (
  <div className="chatWindow">
    <div className="header">
      <span>{chat.users[1].username}</span>
      <button onClick={() => closeChat(chat.id)} type="button" className="close">
        <FontAwesomeIcon icon="window-close" />
      </button>
    </div>
    <div className="messages">
      {chat.messages.map(message => (
        <div
          key={`message${message.id}`}
          className={`message ${message.user.id > 1 ? 'left' : 'right'}`}
        >
          {message.text}
        </div>
      ))}
    </div>
    <AddMessageMutation chat={chat}>
      <ChatInput chat={chat} />
    </AddMessageMutation>
  </div>
);

ChatPanel.defaultProps = {
  chat: {},
};

ChatPanel.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.number,
    messages: PropTypes.arrayOf(PropTypes.object),
    users: PropTypes.arrayOf(PropTypes.object),
  }),
  closeChat: PropTypes.func.isRequired,
};

export default ChatPanel;
