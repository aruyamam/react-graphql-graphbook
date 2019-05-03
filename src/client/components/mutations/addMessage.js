import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_MESSAGE, GET_CHAT } from '../queries/queries';

const AddMessageMutation = ({ children, chat }) => (
  <Mutation
    update={(store, { data: { addMessage } }) => {
      const data = store.readQuery({
        query: GET_CHAT,
        variables: { chatId: chat.id },
      });
      data.chat.messages.push(addMessage);
      store.writeQuery({ query: GET_CHAT, variables: { chatId: chat.id }, data });
    }}
    mutation={ADD_MESSAGE}
  >
    {addMessage => React.Children.map(children, child => React.cloneElement(child, { addMessage }))
      }
  </Mutation>
);

export default AddMessageMutation;
