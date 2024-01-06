import {IMessage, User} from 'react-native-gifted-chat';

export const userEsterBot: User = {
  _id: 0,
  name: 'Ester Bot',
};

export const defaultMessage: IMessage = {
  _id: -1,
  createdAt: new Date(),
  text: 'Ola, tudo bem? Lorem ipsum dolor sit amet con laoreet et justo',
  user: userEsterBot,
};
