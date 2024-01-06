import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {useEffect, useState} from 'react';
import {defaultMessage} from '../../constants/chat';
import {
  chatStyles,
  renderBubble,
  renderComposer,
  renderInputToolbar,
  renderSend,
} from '../../components/Chat';

export const ChatView = () => {
  const [messages, _setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([defaultMessage]);
  }, []);

  function setMessages(someMessages: IMessage[]): void {
    _setMessages(previousMessages =>
      GiftedChat.append(previousMessages, someMessages),
    );
  }

  function onSend(aMessages: IMessage[]) {
    setMessages(aMessages);
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{_id: 1}}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      renderComposer={renderComposer}
      renderSend={renderSend}
      renderAvatar={() => null}
      messagesContainerStyle={chatStyles.container}
    />
  );
};
