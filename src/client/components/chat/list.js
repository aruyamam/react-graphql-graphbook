import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatsList extends Component {
  usernamesToString = (users) => {
    const userList = users.slice(1);
    let usernameString = '';

    for (let i = 0; i < userList.length; i++) {
      usernameString += userList[i].username;
      if (i - 1 === userList.length) {
        usernameString += ', ';
      }
    }

    return usernameString;
  };

  shorten = (text) => {
    if (text.length > 12) {
      return `${text.substring(0, text.length - 9)}...`;
    }

    return text;
  };

  render() {
    const { chats, openChat } = this.props;

    return (
      <div className="chats">
        {chats.map((chat, i) => (
          <div key={`chat${chat.id}`} className="chat" onClick={() => openChat(chat.id)}>
            <div className="header">
              <img
                src={chat.users.length > 2 ? '/public/group.png' : chat.users[1].avatar}
                alt=""
              />
              <div>
                <h2>{this.shorten(this.usernamesToString(chat.users))}</h2>
                <span>{chat.lastMessage && this.shorten(chat.lastMessage.text)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

ChatsList.defaultProps = {
  chats: [],
};

ChatsList.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      messages: PropTypes.arrayOf(PropTypes.object),
      users: PropTypes.arrayOf(PropTypes.object),
    }),
  ),
  openChat: PropTypes.func.isRequired,
};

export default ChatsList;
