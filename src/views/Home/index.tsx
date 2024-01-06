import {Text, TouchableOpacity, View} from 'react-native';
import {ScrolledPage} from '../../components/layout/ScrolledPage';
import {styles} from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {RootStackParamList} from '../../routes';

type HomeProps = NativeStackScreenProps<RootStackParamList>;

export const HomeView = ({navigation}: HomeProps) => {
  function onPress() {
    navigation.navigate('Chat');
  }

  return (
    <ScrolledPage>
      <View style={styles.container}>
        <Text style={styles.title}>ESTer</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>iniciar conversa</Text>
        </TouchableOpacity>
      </View>
    </ScrolledPage>
  );
};
