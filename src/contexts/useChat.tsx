/* eslint-disable @typescript-eslint/no-shadow */
import {PropsWithChildren, createContext, useContext, useState} from 'react';
import {EsterMessage, EsterRequest} from '../views/Chat';
import {api} from '../services/api';
import DeviceInfo from 'react-native-device-info';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {ChatUtils} from '../views/Chat/chat.utils';

interface UseChatContextProps {
  messages: IMessage[];
  fetchMessages: () => Promise<EsterMessage[]>;
  setMessages: (messages: IMessage[]) => void;
  onSend: (messages: IMessage[]) => Promise<void>;
  postMessage(message: string): Promise<EsterMessage>;
}

const UseChatContext = createContext<UseChatContextProps | null>(null);

export const ChatProvider = ({children}: PropsWithChildren) => {
  const [messages, _setMessages] = useState<IMessage[]>([]);

  function setMessages(someMessages: IMessage[]): void {
    _setMessages(previousMessages =>
      GiftedChat.append(previousMessages, someMessages),
    );
  }

  async function postMessage(message: string) {
    const client_id = await DeviceInfo.getUniqueId();
    const body: EsterRequest = {
      message,
      client_id,
    };
    return (await api.post<EsterMessage>('/text', body)).data;
  }

  async function onSend([aMessage]: IMessage[]) {
    setMessages([aMessage]);
    aMessage.pending = true;
    const response = await postMessage(aMessage.text);
    aMessage.pending = false;
    setMessages([ChatUtils.mapEsterMessageToIMessage(response)]);
  }

  function clearMessages() {
    _setMessages([]);
  }

  async function fetchMessages(): Promise<EsterMessage[]> {
    clearMessages();
    const client_id = await DeviceInfo.getUniqueId();
    const params = {client_id};
    const messages: EsterMessage[] = (
      await api.get('/existing-service', {params})
    ).data;
    setMessages(messages.reverse().map(ChatUtils.mapEsterMessageToIMessage));
    return messages;
  }

  // function appendMessages(message: EsterMessage) {}

  return (
    <UseChatContext.Provider
      value={{messages, fetchMessages, onSend, setMessages, postMessage}}>
      {children}
    </UseChatContext.Provider>
  );
};

export function useChat() {
  const context = useContext(UseChatContext);
  return context as UseChatContextProps;
}
