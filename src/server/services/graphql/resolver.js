import { Op } from 'sequelize';
import logger from '../../helpers/logger';

export default function resolver() {
  const { db } = this;
  const {
    Post, User, Chat, Message,
  } = db.models;

  const resolver = {
    Post: {
      user(post, args, context) {
        return post.getUser();
      },
    },
    Message: {
      user(message, args, context) {
        return message.getUser();
      },
      chat(message, args, context) {
        return message.getChat();
      },
    },
    Chat: {
      messages(chat, args, context) {
        return chat.getMessages({ order: [['id', 'ASC']] });
      },
      users(chat, args, context) {
        return chat.getUsers();
      },
      lastMessage(chat, args, context) {
        return chat.getMessages({ limit: 1, order: [['id', 'DESC']] }).then(message => message[0]);
      },
    },
    RootQuery: {
      posts(root, args, context) {
        return Post.findAll({ order: [['createdAt', 'DESC']] });
      },
      chat(root, { chatId }, context) {
        return Chat.findByPk(chatId, {
          include: [
            {
              model: User,
              required: true,
            },
            {
              model: Message,
            },
          ],
        });
      },
      chats(root, args, context) {
        return User.findAll().then((users) => {
          if (!users.length) {
            return [];
          }

          const usersRow = users[0];

          return Chat.findAll({
            include: [
              {
                model: User,
                required: true,
                through: { where: { userId: usersRow.id } },
              },
              {
                model: Message,
              },
            ],
          });
        });
      },
      postsFeed(root, { page, limit }, context) {
        let skip = 0;

        if (page && limit) {
          skip = page * limit;
        }

        const query = {
          order: [['createdAt', 'DESC']],
          offset: skip,
        };

        if (limit) {
          query.limit = limit;
        }

        return {
          posts: Post.findAll(query),
        };
      },
      usersSearch(root, { page, limit, text }, context) {
        if (text.length < 3) {
          return {
            users: [],
          };
        }

        let skip = 0;
        if (page && limit) {
          skip = page * limit;
        }
        const query = {
          order: [['createdAt', 'DESC']],
          offset: skip,
        };
        if (limit) {
          query.limit = limit;
        }
        query.where = {
          username: {
            [Op.like]: `%${text}%`,
          },
        };

        return {
          users: User.findAll(query),
        };
      },
    },
    RootMutation: {
      addPost(root, { post, user }, context) {
        logger.log({
          level: 'info',
          message: 'Post was created',
        });

        return User.findAll().then((users) => {
          const usersRow = users[0];

          return Post.create({
            ...post,
          }).then(newPost => Promise.all([newPost.setUser(usersRow.id)]).then(() => newPost));
        });
      },
      addChat(root, { chat }, context) {
        logger.log({
          level: 'info',
          message: 'Message was reated',
        });

        return Chat.create().then(newChat => Promise.all([newChat.setUsers(chat.users)]).then(() => newChat));
      },
      addMessage(root, { message }, context) {
        logger.log({
          level: 'info',
          message: 'Message was created',
        });

        return User.findAll().then((users) => {
          const usersRow = users[0];

          return Message.create({
            ...message,
          }).then(newMessage => Promise.all([newMessage.setUser(usersRow.id), newMessage.setChat(message.chatId)]).then(
            () => newMessage,
          ));
        });
      },
      updatePost(root, { post, postId }, context) {
        return Post.update(
          {
            ...post,
          },
          {
            where: {
              id: postId,
            },
          },
        ).then((rows) => {
          if (rows[0] === 1) {
            logger.log({
              level: 'info',
              message: `Post ${postId} was updated'`,
            });

            return Post.findById(postId);
          }
        });
      },
      deletePost(root, { postId }, context) {
        return Post.destroy({
          where: {
            id: postId,
          },
        }).then(
          (rows) => {
            if (rows === 1) {
              logger.log({
                level: 'info',
                message: `Post ${postId} was deleted`,
              });

              return {
                success: true,
              };
            }

            return {
              success: false,
            };
          },
          (err) => {
            logger.log({
              level: 'error',
              message: err.message,
            });
          },
        );
      },
    },
  };

  return resolver;
}
