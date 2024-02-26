/* eslint-disable curly */
import {Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {ScrolledPage} from '../../components/layout/ScrolledPage';
import {styles} from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {RootStackParamList} from '../../routes';
import {useChat} from '../../contexts/useChat';
import {useState} from 'react';

type HomeProps = NativeStackScreenProps<RootStackParamList>;

export const HomeView = ({navigation}: HomeProps) => {
  const {fetchMessages, postMessage} = useChat();
  const [isLoading, setIsLoading] = useState(false);

  async function onPress() {
    setIsLoading(true);
    if (isLoading) return;

    const oldMessages = await fetchMessages();
    const hasMessages = oldMessages.length > 0;

    if (hasMessages) {
      setIsLoading(false);
      navigation.navigate('Chat');
    } else {
      await postMessage('Olá, estou com uma dúvida');
      setIsLoading(false);
      navigation.navigate('Chat');
    }
  }

  return (
    <ScrolledPage>
      <View style={styles.container}>
        <Text style={styles.title}>ESTer</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          {isLoading ? (
            <ActivityIndicator size={30} color={styles.buttonText.color} />
          ) : (
            <Text style={styles.buttonText}>iniciar conversa</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrolledPage>
  );
};
