import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {ID_USER} from '../../constants/chat';
import {
  chatStyles,
  renderBubble,
  renderComposer,
  renderEmptyInputToolbar,
  renderInputToolbar,
  renderMessageImage,
  renderSend,
} from '../../components/Chat';
import {useIsFocused} from '@react-navigation/native';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useChat} from '../../contexts/useChat';
import {styles} from './styles';
import {RegularModal} from '../../components/RegularModal';
import {Header} from '../../components/Header';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';

export interface EsterRequest {
  message: string;
  client_id: string;
}

export interface EsterMessage {
  id_: string;
  message: string;
  created_at: string;
  client_id: string;
  is_from_ester: boolean;
}

type ModalTypes = 'finish' | 'none';

type HomeProps = NativeStackScreenProps<RootStackParamList>;

export const ChatView = ({navigation}: HomeProps) => {
  const {messages, send, finishChat, fetchMessages} = useChat();
  const isFocused = useIsFocused();

  const [currentModal, setCurrentModal] = useState<ModalTypes>('none');

  const [modalIsLoading, setModalIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  async function onFinishChat() {
    try {
      setModalIsLoading(true);
      await finishChat();
      await fetchMessages();
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } catch {
    } finally {
      setModalIsLoading(false);
    }
  }

  async function onNoFinishChat() {
    if (modalIsLoading) {
      return;
    }
    setCurrentModal('none');
  }

  async function onSend(aMessages: IMessage[]) {
    try {
      setIsSending(true);
      await send(aMessages);
    } catch (err) {
    } finally {
      setIsSending(false);
    }
  }

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
    <View style={styles.container}>
      <Header
        title="Chat"
        rightIcon={
          <Icon
            name="closecircleo"
            color="white"
            size={28}
            onPress={() => setCurrentModal('finish')}
          />
        }
      />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.select({ios: 'height'})}
        keyboardVerticalOffset={0}>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{_id: ID_USER}}
          renderBubble={renderBubble}
          renderInputToolbar={
            isSending ? renderEmptyInputToolbar : renderInputToolbar
          }
          renderComposer={renderComposer}
          renderSend={renderSend}
          renderAvatar={() => null}
          renderMessageImage={props => renderMessageImage(props, () => null)}
          messagesContainerStyle={chatStyles.container}
        />

        {currentModal === 'finish' ? (
          <RegularModal>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Deseja finalizar a conversa?
              </Text>
              <View style={styles.modalButtonWrapper}>
                <TouchableOpacity
                  onPress={onNoFinishChat}
                  style={styles.modalButton}>
                  <Text
                    style={[styles.modalButtonText, styles.modalButtonTextNo]}>
                    Não
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onFinishChat}
                  style={[styles.modalButton, {backgroundColor: '#2A5A48'}]}>
                  {modalIsLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text
                      style={[
                        styles.modalButtonText,
                        styles.modalButtonTextYes,
                      ]}>
                      Sim
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </RegularModal>
        ) : null}
      </KeyboardAvoidingView>
    </View>
  );
};
