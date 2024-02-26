import {IMessage} from 'react-native-gifted-chat';
import {EsterMessage} from '.';

export class ChatUtils {
  static mapEsterMessageToIMessage({
    created_at,
    id_,
    is_from_ester,
    message,
  }: EsterMessage): IMessage {
    return {
      _id: id_,
      text: message,
      createdAt: new Date(created_at),
      user: {
        _id: Number(is_from_ester),
      },
    };
  }
}
