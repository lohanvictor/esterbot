/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {EsterMessage, EsterRequest} from '../views/Chat';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {ChatUtils} from '../views/Chat/chat.utils';
import {ActivityIndicator, View} from 'react-native';
import {styles} from './useChat.styles';
import {ChatService} from '../services/chat.service';

interface UseChatContextProps {
  messages: IMessage[];
  fetchMessages: () => Promise<EsterMessage[]>;
  appendMessages: (messages: IMessage[]) => void;
  send: (messages: IMessage[]) => Promise<void>;
  postMessage(message: string): Promise<EsterMessage>;
  finishChat: () => Promise<void>;
}

const UseChatContext = createContext<UseChatContextProps | null>(null);

export const ChatProvider = ({children}: PropsWithChildren) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function appendMessages(someMessages: IMessage[]): void {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, someMessages),
    );
  }

  async function postMessage(message: string): Promise<EsterMessage> {
    const client_id = await ChatUtils.getDeviceId();
    const body: EsterRequest = {
      message,
      client_id,
    };
    return ChatService.postMessage(body);
  }

  async function onSend([aMessage]: IMessage[]): Promise<void> {
    appendMessages([aMessage]);
    aMessage.pending = true;
    const response = await postMessage(aMessage.text);
    aMessage.pending = false;
    appendMessages([ChatUtils.mapEsterMessageToIMessage(response)]);
  }

  function clearMessages() {
    setMessages([]);
  }

  async function finishChat(): Promise<void> {
    const clientId = await ChatUtils.getDeviceId();
    await ChatService.finishMessage(clientId);
  }

  async function fetchMessages(): Promise<EsterMessage[]> {
    try {
      clearMessages();
      const client_id = await ChatUtils.getDeviceId();
      const messages = await ChatService.getAllMessages(client_id);
      appendMessages(
        messages.reverse().map(ChatUtils.mapEsterMessageToIMessage),
      );
      return messages;
    } catch (err) {
      return [];
    }
  }

  async function init() {
    try {
      setIsLoading(true);
      await fetchMessages();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  // function appendMessages(message: EsterMessage) {}

  return (
    <UseChatContext.Provider
      value={{
        messages,
        fetchMessages,
        send: onSend,
        appendMessages,
        postMessage,
        finishChat,
      }}>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={32} color="#2A5A48" />
        </View>
      ) : (
        children
      )}
    </UseChatContext.Provider>
  );
};

export function useChat() {
  const context = useContext(UseChatContext);
  return context as UseChatContextProps;
}
