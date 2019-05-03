import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatInput extends Component {
  state = {
    value: '',
  };

  handleKeyPress = (event) => {
    const { chat, addMessage } = this.props;
    const { value } = this.state;

    if (event.key === 'Enter' && value.length) {
      addMessage({ variables: { message: { text: value, chatId: chat.id } } }).then(() => {
        this.setState({ value: '' });
      });
    }
  };

  onChangeChatInput = (event) => {
    event.preventDefault();

    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="input">
        <input
          type="text"
          value={value}
          onChange={this.onChangeChatInput}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

ChatInput.defaultProps = {
  addMessage: null,
};

ChatInput.propTypes = {
  addMessage: PropTypes.func,
  chat: PropTypes.shape({
    id: PropTypes.number,
    messages: PropTypes.arrayOf(PropTypes.object),
    users: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default ChatInput;
