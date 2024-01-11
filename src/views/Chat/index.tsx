import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {useEffect, useState} from 'react';
import {defaultMessage} from '../../constants/chat';
import {
  chatStyles,
  renderBubble,
  renderComposer,
  renderInputToolbar,
  renderMessageImage,
  renderSend,
} from '../../components/Chat';
import {useIsFocused} from '@react-navigation/native';
import {Platform, StatusBar} from 'react-native';

export const ChatView = () => {
  const [messages, _setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages(defaultMessage);
  }, []);

  function setMessages(someMessages: IMessage[]): void {
    _setMessages(previousMessages =>
      GiftedChat.append(previousMessages, someMessages),
    );
  }

  function onSend(aMessages: IMessage[]) {
    setMessages(aMessages);
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setHidden(false);
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent');
      }
    }
  }, [isFocused]);

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
      renderMessageImage={props => renderMessageImage(props, () => null)}
      messagesContainerStyle={chatStyles.container}
    />
  );
};
