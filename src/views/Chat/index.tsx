import {Text, View} from 'react-native';
import {Page} from '../../components/layout/Page';

export const ChatView = () => {
  return (
    <Page>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text>Chat</Text>
      </View>
    </Page>
  );
};
